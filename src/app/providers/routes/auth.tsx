import { ForgotPasswordForm, LoginForm, RegistrationForm } from '@/features';
import { AuthPage, NotFoundPage } from '@/pages';
import { Navigate } from 'react-router';
import { IsAuth } from './СheckAuth';

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
		{ path: "resetPassword", element: <ForgotPasswordForm /> },
	],
};