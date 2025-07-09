import { Helmet } from "react-helmet-async";

interface SEOProps {
	description: string;
	canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ description, canonical }) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			{canonical && <link rel="canonical" href={canonical} />}
		</Helmet>
	);
};
