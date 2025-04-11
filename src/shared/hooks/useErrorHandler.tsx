import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const useErrorHandler = (isError: boolean) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			navigate('/error');
		}
	}, [isError, navigate]);
};