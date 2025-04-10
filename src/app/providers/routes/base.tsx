import { Base } from "@/widgets";
import { RequireAuth } from "./СheckAuth";
import { lazy } from "react";
import { Navigate } from "react-router";

const MainPage = lazy(() => import("@/pages").then(module => ({ default: module.MainPage })))
const ProfilePage = lazy(() => import("@/pages").then(module => ({ default: module.ProfilePage })))


export const baseRoutes = {
	path: "/",
	element:
		<RequireAuth>
			<Base />
		</RequireAuth>,
	children: [
		{ index: true, element: <Navigate to="main" replace /> },
		{ path: "main", element: <MainPage /> },
		{ path: "profile", element: <ProfilePage/> }
	],
};