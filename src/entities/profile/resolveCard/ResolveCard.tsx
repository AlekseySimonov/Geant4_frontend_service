import styles from "./_exampleCard.module.scss"
import { Tag } from '@/shared/ui/components/tag';

const ResolveCard: React.FC = () => {
	return (
		<div className={styles.resolve}>
			<div className={styles.resolve__info}>
				<h4>Hассеяние рентгеновских лучей в среде</h4>
				<h3>12.12.2024</h3>
				<div className={styles.resolve__info__tags}>
					<Tag label='Электромагнитная физика' defaultStyle />
					<Tag label='multithreading' defaultStyle />
				</div>
			</div>
			<div className={styles.resolve__progress}>
				<Tag
					label='В процессе'
					inProgress
					info = 'оповещение о завершении придет на почту'
				/>
			</div>


		</div>
	)
}

export default ResolveCard