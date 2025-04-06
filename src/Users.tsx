import { useMutation } from "@tanstack/react-query";
import { useUsers } from "./hooks/useUsers";
import { sleep } from "./sleep";

export interface IUser {
	id?: string;
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
	const { users, isLoading, refetch, isFetching, error } = useUsers();

	const {
		mutate,
		isPending,
		data,
		error: Mutationerror,
	} = useMutation({
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

		onError: (error, variables) => {
			console.log(error);
		},
		onSuccess: (data, variables) => {
			console.log(data);
		},
		onSettled: (data, variables) => {
			console.log(data);
		},
	});
	console.log({ data });
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const userData = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			address: {
				street: formData.get("street") as string,
				city: formData.get("city") as string,
				state: formData.get("state") as string,
				zip: formData.get("zip") as string,
			},
		};

		console.log("Nome:", userData.name);
		console.log("Email:", userData.email);
		console.log("Endereço:", userData.address.street);
		console.log("Cidade:", userData.address.city);
		console.log("Estado:", userData.address.state);
		console.log("CEP:", userData.address.zip);

		mutate(userData);
	}
	return (
		<>
			<div className="p-4">
				<div className="mb-10">
					<h1 className="text-3xl font-bold">Users</h1>
					<form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
						<input
							type="text"
							name="name"
							placeholder="Name"
							className="border-2 border-gray-500 rounded-md p-2 text-black"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="border-2 border-gray-500 rounded-md p-2 text-black"
						/>
						<input
							type="text"
							name="state"
							placeholder="State"
							className="border-2 border-gray-500 rounded-md p-2 text-black"
						/>
						<input
							type="text"
							name="zip"
							placeholder="Zip"
							className="border-2 border-gray-500 rounded-md p-2 text-black"
						/>
						<input
							type="text"
							name="street"
							placeholder="Street"
							className="border-2 border-gray-500 rounded-md p-2 text-black"
						/>
						<input
							type="text"
							name="city"
							placeholder="City"
							className="border-2 border-gray-500 rounded-md p-2 text-black"
						/>

						<button
							type="submit"
							className="bg-violet-600 text-white px-4 py-2 rounded-md"
						>
							{isPending ? "Cadastrando usuário..." : "Cadastrar usuário"}
						</button>
					</form>
				</div>
			</div>
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
			{users?.map((user) => (
				<div key={user.id}>
					<strong>{user.name}</strong>
					<p>{user.email}</p>
					<p>{user.address?.street}</p>
					<p>{user.address?.city}</p>
					<p>{user.address?.state}</p>
					<p>{user.address?.zip}</p>
				</div>
			))}
		</>
	);
}
