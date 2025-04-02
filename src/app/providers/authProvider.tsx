import { useLazyCheckAuthQuery } from "@/pages/authPage/api/authApi";
import { Loader } from "@/shared";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [triggerCheckAuth, { isLoading }] = useLazyCheckAuthQuery();

    useEffect(() => {
        if (!isAuthenticated) {
            triggerCheckAuth();
        }
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return <>{children}</>;
};