import { useMutation } from "@tanstack/react-query";
import type { IUser } from "../Users";
import { sleep } from "../sleep";

export function useCreateUsers() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (newUser: IUser): Promise<IUser> => {
			await sleep(5000);

			const response = await fetch("http://localhost:3000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});
			return response.json();
		},
	});

	return { createUsers: mutateAsync,isLoading: isPending };
}
