import { Helmet } from "react-helmet-async";

interface SEOProps {
	description: string;
	canonical?: string;
	title?: string
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
	return (
		<Helmet>
			<title>{title ? title : 'Geant4ru'}</title>
			<meta name="description" content={description} />
			{canonical && <link rel="canonical" href={canonical} />}
		</Helmet>
	);
};
