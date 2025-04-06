import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Posts } from "./Posts";
import { Users } from "./Users";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5000,
			retry: false,
			refetchOnWindowFocus: false,
			gcTime: 10 * 60 * 1000,
			// 10 minutes
		},
		mutations: {
			retry: 2,
		},
	},
});

export function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<ul>
						<li>
							<Link to="/">Users</Link>
							<Link to="/posts">Posts</Link>
						</li>
					</ul>
					<Routes>
						<Route path="/" element={<Users />} />
						<Route path="/posts" element={<Posts />} />
					</Routes>
					<ReactQueryDevtools buttonPosition="bottom-right" />
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
