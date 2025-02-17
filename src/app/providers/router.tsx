import { createBrowserRouter } from "react-router";
import { authRoutes } from "./routes/auth";
import { AuthPage, NotFoundPage } from "@/pages";

export const appRouter = createBrowserRouter([
	authRoutes,
	{
		path: "*",
		element: <NotFoundPage />, 
	},
]
);