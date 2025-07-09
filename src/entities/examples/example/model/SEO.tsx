import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOExampleViewProps {
	title?: string;
	description?: string;
	canonical?: string;
}

export const SEOExampleView: React.FC<SEOExampleViewProps> = ({
	title = 'Пример моделирования — Документация',
	description = 'Просмотр примера моделирования.',
	canonical = window.location.href,
}) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={canonical} />
		</Helmet>
	);
};