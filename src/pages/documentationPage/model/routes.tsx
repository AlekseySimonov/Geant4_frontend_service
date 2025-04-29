import { ArticlesList, ImportantArticles } from "@/features";
import { lazy } from "react";
import { Navigate } from "react-router";

const DocumentationPage = lazy(() => import("@/pages").then(module => ({ default: module.DocumentationPage })))

export const docRoutes = {
	path: "/documentation",
	element: <DocumentationPage />,
	children: [
		{ index: true, element: <Navigate to="articles" replace /> },
		{ path: "articles", element: <ArticlesList /> },
		{ path: "articles/important", element: <ImportantArticles /> },
	],
};