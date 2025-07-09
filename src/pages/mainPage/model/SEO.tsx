import { Helmet } from 'react-helmet-async';

export const SEOMainPage: React.FC = () => {
	return (
		<Helmet>
			<title>Geant4ru — Моделирование взаимодействия частиц</title>
			<meta
				name="description"
				content="Geant4ru — платформа моделирования прохождения частиц через вещество. Используется в физике высоких энергий, медицине, космосе и других областях."
			/>
			<link rel="canonical" href={window.location.href} />
		</Helmet>
	);
};
