const { create } = require('xmlbuilder2');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const FRONT_URL = process.env.FRONT_BASE_URL || 'http://localhost:3000';

async function getDynamicRoutes() {
	const [articlesRes, examplesRes] = await Promise.all([
		axios.get(`${BASE_URL}/no-search-path/`, { withCredentials: true }),
	]);

	const articleRoutes = articlesRes.data.map((article) => `/documentation/articles/view/${article.id}`);

	return [...articleRoutes];
}

const staticRoutes = [
	'/',
	'/main',
	'/documentation',
	'/documentation/articles',
	'/modeling',
	'/modeling/examples',
];

async function generateSitemap() {
	const dynamicRoutes = await getDynamicRoutes();
	const allRoutes = [...staticRoutes, ...dynamicRoutes];

	const urlset = create({ version: '1.0' }).ele('urlset', {
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
	});

	allRoutes.forEach((route) => {
		urlset.ele('url').ele('loc').txt(`${FRONT_URL}${route}`);
	});

	const xml = urlset.end({ prettyPrint: true });
	fs.writeFileSync(path.join(__dirname, '../../public/sitemap.xml'), xml, 'utf-8');

	console.log('✅ Sitemap сгенерирован.');
}

generateSitemap().catch((err) => {
	console.error('❌ Ошибка при генерации sitemap:', err);
	process.exit(1);
});
