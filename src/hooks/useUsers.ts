import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../Users";
import { sleep } from "../sleep";

export function useUsers() {
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

	return {
		users: data ?? [],
		isLoading,
		refetch,
		isFetching,
		error,
	};
}
