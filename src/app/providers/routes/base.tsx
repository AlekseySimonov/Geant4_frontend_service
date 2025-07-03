import { Base } from "@/widgets";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import { Loader } from "@/shared";
import { docRoutes } from "@/pages/documentationPage";
import { examplesRoutes } from "@/pages/examplesPage";
import { profileRoutes } from '@/pages/profilePage';

const MainPage = lazy(() => import("@/pages").then(module => ({ default: module.MainPage })))

export const baseRoutes = {
	path: "/",
	element:
		<Suspense fallback={<Loader />}>
			<Base />
		</Suspense>,
	children: [
		{ index: true, element: <Navigate to="main" replace /> },
		{ path: "main", element: <MainPage /> },
		profileRoutes,
		docRoutes,
		examplesRoutes,
	],
};