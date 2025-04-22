import { useCheckAuthQuery } from "@/pages/authPage/api/authApi"
import styles from "./_mainPage.module.scss"
import mainBack from "@/shared/ui/assets/mainBack.jpg"
import { useMediaQuery, useTheme } from "@mui/material"
import { PrimaryButton } from '@/shared/ui/components/buttons/PrimaryButton';
import { Card } from "@/shared/ui/components/card";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import logoWithText from "@/shared/ui/assets/logoWithText.jpg"
import { useEffect } from "react";
import { useNavigate } from "react-router";

const MainPage: React.FC = () => {
	const navigate = useNavigate()
	const { isError } = useCheckAuthQuery()
	
	useEffect(() => {
		if (isError) {
			navigate('/auth/login')
		}
	},[isError, navigate])

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))
	return (
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
					<PrimaryButton link="/" size="m">
						<h3>Начать</h3>
					</PrimaryButton>
				</div>
				<img src={mainBack} alt="#" />
			</div>
			<div className={styles.main__cards}>
				<div className={styles.main__cards__company}>
					<img src={logoWithText} alt="#" />
					<h2>Лаборатория ТГУ</h2>
					<p>Узнайте больше о лаборатории, занимающейся разработкой этого сайта</p>
					<SecondaryButton label='Читать больше' link='/' />
				</div>
				<Card
					title="Загрузка"
					text="Исходный код Geant4 и установочные файлы доступны для загрузки."
					link="/"
					btnLabel="Последняя версия: 11.3.0"
				/>
				<Card
					title="Документация"
					text="Документация Geant4ru, а также учебные пособия и руководства, доступны онлайн."
					link="/documentation"
					btnLabel="Читать документацию"
				/>
				<Card
					title="Сайт Geant4"
					text="Узнайте больше о разработчиках Geant4 из прямого источника"
					link="/"
					btnLabel="Перейти на сайт"
				/>
				<Card
					title="Начало работы"
					text="Всё, что нужно для начала работы с Geant4ru."
					link="/"
					btnLabel="Начать моделирование"
				/>

			</div>
			<div className={styles.main__footer}>
				<div className={styles.main__footer__background}></div>
			</div>
		</div>
	)
}

export default MainPage