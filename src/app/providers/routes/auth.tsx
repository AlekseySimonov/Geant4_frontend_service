import { ResetPasswordForm, LoginForm, RegistrationForm } from '@/features';
import { NotFoundPage } from '@/pages';
import { Navigate } from 'react-router';
import { IsAuth } from './СheckAuth';
import { lazy } from 'react';
import { EmailVerifyConfirmPage } from '@/features/auth/ui/EmailVerify';
import { ResetPasswordConfirm } from '@/features/auth/ui/ResetPasswordConfirm';

const AuthPage = lazy(() => import("@/pages").then(module => ({ default: module.AuthPage })))

export const authRoutes = {
	path: "/auth",
	element:
		<IsAuth>
			<AuthPage />
		</IsAuth>,
	errorElement: <NotFoundPage />,
	children: [
		{ index: true, element: <Navigate to="login" replace /> },
		{ path: "login", element: <LoginForm /> },
		{ path: "registration", element: <RegistrationForm /> },
		{ path: "resetPassword", element: <ResetPasswordForm /> },
		{ path: "email_verify/:token", element: <EmailVerifyConfirmPage /> },
		{ path: "password_recovery/:token",element: <ResetPasswordConfirm />,},
	],
};