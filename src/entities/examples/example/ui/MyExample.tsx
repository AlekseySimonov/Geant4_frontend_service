import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetGraphsMutation } from "@/pages/examplesPage/api/examplesApi";
import styles from "./_example.module.scss"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { PrimaryButton, SecondaryButton } from '@/shared/ui/components/buttons';
import { CsvGraphFromZip } from "@/entities/graph";
import { useGetExampleQuery } from "@/pages/profilePage/api/profileApi";

const MyExample: React.FC = () => {

	const navigate = useNavigate()
	const location = useLocation()

	const [zipBlob, setZipBlob] = useState<Blob | null>(null);

	const { id } = useParams<{ id: string }>();
	const numericId = Number(id);
	const { data: example, isLoading, isError } = useGetExampleQuery(numericId);

	const [getGraphs, { data: graphsData, isLoading: isGraphsLoading, isError: isGraphsError }] = useGetGraphsMutation();
	useEffect(() => {
		getGraphs(numericId).unwrap().then(setZipBlob);
	}, [numericId]);

	if (!example) return null;

	const handleBackClick = () => {
		if (location.state?.from) {
			navigate(location.state?.from);
		} else {
			navigate('/profile');
		}
	};

	return (
		<div className={styles.example}>
			<div className={styles.example__header}>
				<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={handleBackClick} />
				<div className={styles.example__header__title}>
					<h2>{example.title_verbose}</h2>
					{example.category}
				</div>
			</div>
			<div className={styles.example__block}>
				<h4>Моделирование</h4>
				<div className={styles.example__block__content}>
					<p>{example.description}</p>
				</div>
			</div>
			<div className={styles.example__block}>
				<h4>Результат</h4>
				{zipBlob && <CsvGraphFromZip zipBlob={zipBlob} />}
			</div>
		</div>

	);
};

export default MyExample;