import { SEO } from '@/shared';

export const SEOMainPage: React.FC = () => {
	const content = 'Geant4ru — платформа моделирования прохождения частиц через вещество. Используется в физике высоких энергий, медицине, космосе и других областях'
	const link = window.location.href
	return (
		<SEO title='Geant4ru — Главная страница' description={content} canonical={link } />
	);
};
