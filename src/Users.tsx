import { useQuery } from "@tanstack/react-query";
import { sleep } from "./sleep";

export interface IUser {
	id: string;
	name: string;
	email: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
}

export function Users() {
	const { data, isLoading, refetch, isFetching, error } = useQuery({
		queryKey: ["users"],
		staleTime: 1000,
		gcTime: 30000,

		queryFn: async (): Promise<IUser[]> => {
			await sleep();
			const response = await fetch("http://localhost:3000/users");
			return response.json();
		},
	});

	return (
		<>
			<button
				onClick={() => refetch()}
				type="button"
				className="bg-violet-600 text-white px-4 py-2 rounded-md"
			>
				Sign Up
			</button>
			{isLoading && <h1>Está carregando...</h1>}
			{!isLoading && isFetching && <h1>Está buscando...</h1>}
			{error && <h1>Erro!</h1>}
			{data?.map((user) => (
				<div key={user.id}>
					<strong>{user.name}</strong>
					<p>{user.email}</p>
					<p>{user.address.street}</p>
					<p>{user.address.city}</p>
					<p>{user.address.state}</p>
					<p>{user.address.zip}</p>
				</div>
			))}
		</>
	);
}
