import { WithChildren } from "@/shared/types/generalTypes";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router";


export const RequireAuth: React.FC<WithChildren> = ({ children }) => {

	let location = useLocation()
	if (!Cookies.get("access")) {
		return <Navigate to="/auth/login" state={{ from: location }} replace />
	}

	return children
}

export const IsAuth: React.FC<WithChildren> = ({ children }) => {
	if (Cookies.get("access")) {
		return <Navigate to="/" replace />
	}

	return children
}