import { createBrowserRouter, Navigate } from "react-router";
import { authRoutes } from "./routes/auth";
import { NotFoundPage } from "@/pages";
import { baseRoutes } from "./routes/base";

export const appRouter = createBrowserRouter([
	authRoutes,
	baseRoutes,
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]
);