import { Base } from "@/widgets";
import { lazy } from "react";
import { Navigate } from "react-router";
import { ProfileSettings } from "@/features";

const MainPage = lazy(() => import("@/pages").then(module => ({ default: module.MainPage })))
const ProfilePage = lazy(() => import("@/pages").then(module => ({ default: module.ProfilePage })))


export const baseRoutes = {
	path: "/",
	element: <Base />,
	children: [
		{ index: true, element: <Navigate to="main" replace /> },
		{ path: "main", element: <MainPage /> },
		{ path: "profile", element: <ProfilePage /> },
		{ path: "profile/settings", element: <ProfileSettings/> }
	],
};