import { Helmet } from "react-helmet-async";

interface SEOProps {
	title: string;
	description: string;
	canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			{canonical && <link rel="canonical" href={canonical} />}
		</Helmet>
	);
};
