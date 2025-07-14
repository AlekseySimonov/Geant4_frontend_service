import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetGraphsMutation } from "@/pages/examplesPage/api/examplesApi";
import styles from "./_example.module.scss";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { CsvGraphFromZip } from "@/entities/graph";
import { useGetExampleQuery } from "@/pages/profilePage/api/profileApi";
import { PrimaryButton } from "@/shared/ui/components/buttons";

const MyExample: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [zipBlob, setZipBlob] = useState<Blob | null>(null);

	const { id } = useParams<{ id: string }>();
	const numericId = Number(id);
	const { data: example, isLoading, isError } = useGetExampleQuery(numericId);

	const [getGraphs, { isError: isGraphsError }] = useGetGraphsMutation();

	useEffect(() => {
		if (numericId && example?.status === 1) {
			getGraphs({ id: example.example_id, commands: example.params })
				.unwrap()
				.then(setZipBlob)
				.catch((err) => {
					console.error("Ошибка при получении графиков:", err);
				});
		}
	}, [numericId, example?.status]);

	if (!example) return null;

	const handleBackClick = () => {
		if (location.state?.from) {
			navigate(location.state.from);
		} else {
			navigate('/profile');
		}
	};

	const handleDownloadClick = () => {
		if (!zipBlob) return;

		const url = URL.createObjectURL(zipBlob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `example-${example?.title_verbose}.zip`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);
	};

	return (
		<div className={styles.example}>
			<div className={styles.example__header}>
				<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={handleBackClick} />
				<div className={styles.example__header__title}>
					<h2>{example.title_verbose}</h2>
					{example.category}
				</div>
				<PrimaryButton
					label="Скачать файл"
					onClick={handleDownloadClick}
					disabled={!zipBlob}
				/>
			</div>

			{example.status === 0 && (
				<div className={styles.example__block}>
					<div className={styles.status__inProcess}>
						Моделирование выполняется. По окончанию Моделирования вам на почту придет оповещение
					</div>
				</div>
			)}

			{example.status === 2 && (
				<div className={styles.example__block}>
					<div className={styles.status__error}>
						В данный момент моделирование невозможно. Повторите попытку позже
					</div>
				</div>
			)}

			{example.description && (
				<div className={styles.example__block}>
					<h4>Моделирование</h4>
					<div className={styles.example__block__content}>
						<p>{example.description}</p>
					</div>
				</div>
			)}

			{example.status === 1 && <div className={styles.example__block}>
				<h4>Результат</h4>
				{isGraphsError && (<p style={{ color: "red" }}>Ошибка при получении графиков, попробуйте позже</p>)}
				{zipBlob && <CsvGraphFromZip zipBlob={zipBlob} />}
			</div>}
		</div>
	);
};

export default MyExample;
