import { ArticlesList, ImportantArticles } from "@/features";
import { lazy } from "react";
import { Navigate } from "react-router";

const DocumentationPage = lazy(() => import("@/pages").then(module => ({ default: module.DocumentationPage })))
const ArticleEditor = lazy(() => import("@/pages").then(module => ({ default: module.ArticleEditor })))
const Article = lazy(() => import("@/entities").then(module => ({ default: module.Article })))

export const docRoutes = {
	path: "/documentation",
	element: <DocumentationPage />,
	children: [
		{ index: true, element: <Navigate to="articles" replace /> },
		{ path: "articles", element: <ArticlesList /> },
		{ path: "articles/important", element: <ImportantArticles /> },
		{ path: "articles/editor", element: <ArticleEditor /> },
		{ path: "articles/editor/:id", element: <ArticleEditor /> },
		{ path: "articles/view/:id", element: <Article /> },
	],
};
