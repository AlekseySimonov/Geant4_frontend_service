import { createBrowserRouter, Navigate } from "react-router";
import { authRoutes } from "./routes/auth";
import { baseRoutes } from "./routes/base";
import { Suspense } from "react";

export const appRouter = createBrowserRouter([
	authRoutes,
	baseRoutes,
	{
		path: "*",
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<Navigate to="/" replace />
			</Suspense>
		),
	},
]
);