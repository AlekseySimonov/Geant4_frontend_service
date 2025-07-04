import { lazy } from "react";
import { Navigate } from "react-router";

const ProfilePage = lazy(() => import("@/pages").then(module => ({ default: module.ProfilePage })))
const ProfileSettings = lazy(() => import("@/features").then(module => ({ default: module.ProfileSettings })))
const EmailUpdate = lazy(() => import("@/features").then(module => ({ default: module.EmailUpdate })))
const MyExample = lazy(() => import("@/entities").then(module => ({ default: module.MyExample })))
const ProfileMain = lazy(() => import("@/pages").then(module => ({ default: module.ProfileMain })))

export const profileRoutes = 
	{
		path: "/profile",
		element: <ProfilePage />,
		children: [
			{ index: true, element: <Navigate to="main" replace /> },
			{ path: "main", element: <ProfileMain /> },
			{ path: "settings", element: <ProfileSettings /> },
			{ path: "update_email/:token", element: <EmailUpdate /> },
			{ path: "my-example/:id", element: <MyExample /> },
		],
	}

