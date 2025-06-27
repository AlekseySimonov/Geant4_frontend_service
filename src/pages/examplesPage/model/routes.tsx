import { lazy } from "react";
import { Navigate } from "react-router";
import ExamplesPage from "../ui/ExamplesPage";

const ExamplesList = lazy(() => import("@/features").then(module => ({ default: module.ExamplesList })))
const Example = lazy(() => import("@/entities").then(module => ({ default: module.Example })))
const ModelSettings = lazy(() => import("@/features").then(module => ({ default: module.ModelSettings })))

export const examplesRoutes = {
	path: "/modeling",
	element: <ExamplesPage />,
	children: [
		{ index: true, element: <Navigate to="examples" replace /> },
		{ path: "examples", element: <ExamplesList /> },
		{ path: "examples/:id", element: <Example /> },
		{ path: "examples/:id/settings", element: <ModelSettings /> },
	],
};
