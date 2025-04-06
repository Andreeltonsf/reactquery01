import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { IUser } from "./Users";
import { sleep } from "./sleep";

interface IPosts {
	id: number;
	title: string;
	body: string;
	userId: string;
}

export function Posts() {
	const queryClient = useQueryClient();

	const { data, isLoading, refetch, isFetching } = useQuery({
		enabled: true,
		queryKey: ["posts"],
		staleTime: 1000 * 60,
		queryFn: async (): Promise<IPosts[]> => {
			await sleep();
			const response = await fetch("http://localhost:3000/posts");
			return response.json();
		},
	});

	function handleMouseEnter() {
		queryClient.prefetchQuery({
			queryKey: ["users"],
			staleTime: 30000,

			queryFn: async (): Promise<IUser[]> => {
				await sleep(500);
				const response = await fetch("http://localhost:3000/users");
				return response.json();
			},
		});
	}

	return (
		<>
			<button
				type="button"
				className="bg-violet-600 text-white px-4 py-2 rounded-md"
				onClick={() => refetch()}
			>
				Listars os posts
			</button>
			{isLoading && <h1>Está carregando...</h1>}
			{!isLoading && isFetching && <h1>Está buscando...</h1>}
			{data?.map((post) => (
				<div key={post.id}>
					<strong>{post.title}</strong>
					<p>{post.body}</p>
				</div>
			))}

			<Link to="/" onMouseEnter={handleMouseEnter}>
				Ir para usuários
			</Link>
		</>
	);
}
