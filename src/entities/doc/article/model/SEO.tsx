import { SEO } from '@/shared';
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOArticleProps {
	title?: string
	description?: string;
	canonical?: string;
}

export const SEOArticle: React.FC<SEOArticleProps> = ({
	title = 'Geant4ru',
	description = 'Описание статьи',
	canonical = window.location.href,
}) => {
	return (
		<SEO title={`Geant4ru — ${title}`} description={description} canonical={canonical} />
	);
};