import { Base } from "@/widgets";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import { EmailUpdate, ProfileSettings } from "@/features";
import { Loader } from "@/shared";
import { docRoutes } from "@/pages/documentationPage";
import { examplesRoutes } from "@/pages/examplesPage";

const MainPage = lazy(() => import("@/pages").then(module => ({ default: module.MainPage })))
const ProfilePage = lazy(() => import("@/pages").then(module => ({ default: module.ProfilePage })))

export const baseRoutes = {
	path: "/",
	element:
		<Suspense fallback={<Loader />}>
			<Base />
		</Suspense>,
	children: [
		{ index: true, element: <Navigate to="main" replace /> },
		{ path: "main", element: <MainPage /> },
		{ path: "profile", element: <ProfilePage /> },
		{ path: "profile/settings", element: <ProfileSettings /> },
		{ path: "profile/update_email/:token", element: <EmailUpdate /> },
		docRoutes,
		examplesRoutes,
	],
};