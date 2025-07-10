import { SEO } from '@/shared';
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOExampleViewProps {
	title?: string;
	description?: string;
	canonical?: string;
}

export const SEOExampleView: React.FC<SEOExampleViewProps> = ({
	title = 'Geant4ru',
	description = 'Просмотр примера моделирования.',
	canonical = window.location.href,
}) => {
	return (
		<SEO title={title} description={description} canonical={canonical} />
	);
};