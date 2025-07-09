import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetExampleQuery, useGetGraphsMutation } from "@/pages/examplesPage/api/examplesApi";
import styles from "./_example.module.scss"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { PrimaryButton, SecondaryButton } from '@/shared/ui/components/buttons';
import { CsvGraphFromZip } from "@/entities/graph";
import { SEOExampleView } from "../model";

const Example: React.FC = () => {

	const navigate = useNavigate()
	const location = useLocation()

	const [zipBlob, setZipBlob] = useState<Blob | null>(null);

	const { id } = useParams<{ id: string }>();
	const numericId = Number(id);
	const { data: example, isLoading, isError } = useGetExampleQuery(numericId);

	const [getGraphs, { isError: isGraphsError }] = useGetGraphsMutation();
	useEffect(() => {
		if (numericId && example) {
			getGraphs({ id: Number(id) }).unwrap()
				.then(setZipBlob)
				.catch((err) => {
					console.error("Ошибка при получении графиков:", err);
				});
		}

	}, [numericId, example]);

	const handleBackClick = () => {
		if (location.state?.from) {
			navigate(location.state?.from);
		} else {
			navigate('/modeling/examples');
		}
	};

	if (!example) return null

	return (
		<>
			<SEOExampleView
				description={example.description}
			/>
			<div className={styles.example}>
				<div className={styles.example__header}>
					<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={handleBackClick} />
					<div className={styles.example__header__title}>
						<h2>{example.title_verbose}</h2>
						{example.category}
					</div>
					<PrimaryButton label="Моделировать" onClick={() => navigate(`/modeling/examples/${id}/settings/`)} />
				</div>
				<div className={styles.example__block}>
					<h4>Моделирование</h4>
					<div className={styles.example__block__content}>
						<p>{example.description}</p>
					</div>
				</div>
				<div className={styles.example__block}>
					<h4>Результат</h4>
					{isGraphsError && (<p style={{ color: "red" }}>Ошибка при получении графиков, попробуйте позже</p>)}
					{zipBlob && <CsvGraphFromZip zipBlob={zipBlob} />}
				</div>
			</div>
		</>
	);
};

export default Example;


