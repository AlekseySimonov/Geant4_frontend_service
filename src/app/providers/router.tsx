import { createBrowserRouter, Navigate } from "react-router";
import { authRoutes } from "./routes/auth";
import { baseRoutes } from "./routes/base";
import { Suspense } from "react";
import { Loader } from "@/shared";

export const appRouter = createBrowserRouter([
	baseRoutes,
	authRoutes,
	{
		path: "*",
		element: (
			<Suspense fallback={<Loader/>}>
				<Navigate to="/" replace />
			</Suspense>
		),
	},
]
);