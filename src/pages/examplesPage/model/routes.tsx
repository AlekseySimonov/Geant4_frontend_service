import { lazy } from "react";
import { Navigate } from "react-router";
import ExamplesPage from "../ui/ExamplesPage";

const ExamplesList = lazy(() => import("@/features").then(module => ({ default: module.ExamplesList })))

export const examplesRoutes = {
	path: "/modeling",
	element: <ExamplesPage />,
	children: [
		{ index: true, element: <Navigate to="examples" replace /> },
		{ path: "examples", element: <ExamplesList /> },
	],
};
