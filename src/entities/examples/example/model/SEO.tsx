import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOExampleViewProps {
	description?: string;
	canonical?: string;
}

export const SEOExampleView: React.FC<SEOExampleViewProps> = ({
	description = 'Просмотр примера моделирования.',
	canonical = window.location.href,
}) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			<link rel="canonical" href={canonical} />
		</Helmet>
	);
};