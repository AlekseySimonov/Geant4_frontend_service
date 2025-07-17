import { useCheckAuthQuery } from "@/pages/authPage/api/authApi"
import styles from "./_mainPage.module.scss"
import mainBack from "@/shared/ui/assets/mainBack.jpg"
import mainBackDark from "@/shared/ui/assets/mainBackDark.jpg"
import { useColorScheme, useMediaQuery, useTheme } from "@mui/material"
import { PrimaryButton } from '@/shared/ui/components/buttons/PrimaryButton';
import { Card } from "@/shared/ui/components/card";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import logoWithText from "@/shared/ui/assets/logoWithText.png"
import logoWithTextDark from "@/shared/ui/assets/logoWithTextDark.png"
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SEOMainPage } from "../model"

const MainPage: React.FC = () => {
	const navigate = useNavigate()
	const { data, isError, isSuccess } = useCheckAuthQuery()

	const { mode, systemMode } = useColorScheme();
	const effectiveMode = mode === 'system' ? systemMode : mode;

	useEffect(() => {
		if (isError || (isSuccess && data?.detail === false)) {
			navigate('/auth/login')
		}
	}, [isError, data, navigate])

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))
	return (
		<>
			<SEOMainPage />
			<div className={styles.main} data-testid="mainPage">
				<div className={styles.main__section}>
					<div className={styles.main__section__info}>
						<h1>Geant4ru</h1>
						{isMobile ? (<h3 >Читать подробнее о всех возможностях</h3>) :
							(
								<p>
									Набор инструментов для моделирования прохождения частиц через вещество.
									Области применения включают физику высоких энергий, ядерную и ускорительную
									физику, а также исследования в медицинских и космических приложениях.
								</p>
							)
						}
						<PrimaryButton link="/modeling/examples" size="m">
							<h3>Начать</h3>
						</PrimaryButton>
					</div>
					<>
						<img
							src={mainBack}
							alt="background"
							style={{ display: effectiveMode === 'dark' ? 'none' : 'block' }}
						/>
						<img
							src={mainBackDark}
							alt="background"
							style={{ display: effectiveMode === 'dark' ? 'block' : 'none' }}
						/>
					</>
				</div>
				<div className={styles.main__cards}>
					<div className={styles.main__cards__company}>
						{mode === 'dark' ? <img src={logoWithTextDark} alt="#" /> : <img src={logoWithText} alt="#" />}
						<h2>Лаборатория ТГУ</h2>
						<p>Узнайте больше о лаборатории, занимающейся разработкой этого сайта</p>
						<SecondaryButton label='Читать больше' link='https://hep.tsu.ru/' />
					</div>
					<Card
						title="Документация"
						text="Документация Geant4ru, а также учебные пособия и руководства, доступны онлайн."
						link="/documentation"
						btnLabel="Читать документацию"
					/>
					<Card
						title="Начало работы"
						text="Всё, что нужно для начала работы с Geant4ru."
						link="/modeling/examples"
						btnLabel="Начать моделирование"
					/>
					<Card
						title="Сайт Geant4"
						text="Узнайте больше о разработчиках Geant4 из прямого источника"
						link="https://geant4.web.cern.ch/"
						btnLabel="Перейти на сайт"
					/>
					<Card
						title="Загрузка"
						text="Исходный код Geant4 и установочные файлы доступны для загрузки."
						link="https://gitlab.cern.ch/geant4/geant4/-/archive/v11.3.2/geant4-v11.3.2.zip"
						btnLabel="Последняя версия: 11.3.2"
					/>
				</div>
			</div>
		</>
	)
}

export default MainPage