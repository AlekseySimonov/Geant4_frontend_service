import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOArticleProps {
	title?: string;
	description?: string;
	canonical?: string;
}

export const SEOArticle: React.FC<SEOArticleProps> = ({
	title = 'Статья — Документация',
	description = 'Описание статьи',
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