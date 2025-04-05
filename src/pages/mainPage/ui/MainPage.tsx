import { useLazyLogoutQuery, } from "@/pages/authPage/api/authApi"
import styles from "./_mainPage.module.scss"
import mainBack from "@/shared/ui/assets/mainBack.jpg"
import { useMediaQuery, useTheme } from "@mui/material"
import { PrimaryButton } from '@/shared/ui/components/buttons/PrimaryButton';
import { Card } from "@/shared/ui/components/card";

const MainPage: React.FC = () => {
	const [triggerLogout] = useLazyLogoutQuery()

	// const handleLogout = async () => {
	// 	try {
	// 		await triggerLogout().unwrap()
	// 	} catch (error) {
	// 		console.log("Logout failed:", error)
	// 	}
	// }

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))
	return (
		<div className={styles.main} data-testid="mainPage">
			<div className={styles.main__section}>
				<div className={styles.main__section__info}>
					<h1>Geant4ru</h1>
					{isMobile ? (<h3 >Читать подробнее о всех возможностях</h3>) :
						(
							<h3>
							Набор инструментов для моделирования прохождения частиц через вещество.
							Области применения включают физику высоких энергий, ядерную и ускорительную
							физику, а также исследования в медицинских и космических приложениях.
							</h3>
						)
					}
					<PrimaryButton label="Начать" link = "/" /> 
				</div>
				<img src={mainBack} alt="#" />
			</div>
			<div className={styles.main__cards}>
				<Card
					title="Загрузка"
					text="Исходный код Geant4 и установочные файлы доступны для загрузки."
					link="/"
					btnLabel="Последняя версия: 11.3.0"
				/>
				<Card
					title="Документация"
					text="Документация Geant4ru, а также учебные пособия и руководства, доступны онлайн."
					link="/"
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
			<div className={styles.main__footer}></div>
			{/* <button onClick={handleLogout}>logout</button> */}
		</div>
	)
}

export default MainPage