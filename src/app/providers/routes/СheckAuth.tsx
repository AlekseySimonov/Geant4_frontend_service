import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Navigate } from "react-router";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	return !isAuthenticated ? <Navigate to="/auth/login" replace /> : <>{children}</>;
};

export const IsAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};