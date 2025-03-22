import { NotFoundPage } from "@/pages";
import { RequireAuth } from "./СheckAuth";

export const baseRoutes = {
	path: "/",
	element:
		<RequireAuth>
			<NotFoundPage />
		</RequireAuth>,
	errorElement: <NotFoundPage />,
	// children: [],
};