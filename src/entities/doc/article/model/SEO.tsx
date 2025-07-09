import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOArticleProps {
	description?: string;
	canonical?: string;
}

export const SEOArticle: React.FC<SEOArticleProps> = ({
	description = 'Описание статьи',
	canonical = window.location.href,
}) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			<link rel="canonical" href={canonical} />
		</Helmet>
	);
};