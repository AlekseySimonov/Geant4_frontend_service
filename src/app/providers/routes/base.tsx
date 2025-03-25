import { RequireAuth } from "./СheckAuth";
import { lazy } from "react";

const MainPage = lazy(() => import("@/pages").then(module => ({ default: module.default })))

export const baseRoutes = {
	path: "/",
	element:
		<RequireAuth>
			<MainPage />
		</RequireAuth>,
	// children: [],
};