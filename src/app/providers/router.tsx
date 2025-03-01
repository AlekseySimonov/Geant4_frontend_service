import { createBrowserRouter } from "react-router";
import { authRoutes } from "./routes/auth";
import { NotFoundPage } from "@/pages";

export const appRouter = createBrowserRouter([
	authRoutes,
	{
		path: "*",
		element: <NotFoundPage />, 
	},
]
);