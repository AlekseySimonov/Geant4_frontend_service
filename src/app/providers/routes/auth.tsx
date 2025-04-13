import { LoginForm, RegistrationForm, ResetPasswordForm,  EmailVerifyConfirmPage, ResetPasswordConfirm  } from '@/features';
import { Navigate } from 'react-router';
import { lazy } from 'react';

const AuthPage = lazy(() => import("@/pages").then(module => ({ default: module.AuthPage })))

export const authRoutes = {
	path: "/auth",
	element: <AuthPage />,
	children: [
		{ index: true, element: <Navigate to="login" replace /> },
		{ path: "login", element: <LoginForm /> },
		{ path: "registration", element: <RegistrationForm /> },
		{ path: "resetPassword", element: <ResetPasswordForm /> },
		{ path: "registration/confirm/:token", element: <EmailVerifyConfirmPage /> },
		{ path: "password_recovery/:token",element: <ResetPasswordConfirm />,},
	],
};