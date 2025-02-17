import { ForgotPasswordForm, LoginForm, RegistrationForm } from '@/features';
import { AuthPage, NotFoundPage } from '@/pages';
import { Navigate } from 'react-router';

export const authRoutes = {
	path: "/auth",
	element: <AuthPage />,
	errorElement: <NotFoundPage />,
	children: [
			{index: true, element: <Navigate to="login" replace />},
			{ path: "login", element: <LoginForm /> },
			{ path: "registration", element: <RegistrationForm />},
			{ path: "resetPassword", element: <ForgotPasswordForm /> },
		],
};