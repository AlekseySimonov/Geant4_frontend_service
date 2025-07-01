import { useLocation, useNavigate, useParams } from "react-router";
import styles from "./_modelSettings.module.scss"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { FormField } from "@/shared";
import { Formik } from 'formik';
import { Form } from 'formik';
import { useGetExampleQuery } from "@/pages/examplesPage/api/examplesApi";
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
const ModelSettings: React.FC = () => {

	const navigate = useNavigate()
	const location = useLocation()

	const { id } = useParams<{ id: string }>();
	const { data: example, isLoading, isError } = useGetExampleQuery(Number(id))

	const initialValues = useMemo(() => {
		if (!example) return {};
		return example.commands.reduce((acc, cmd) => {
			acc[cmd.title] = cmd.default ?? "";
			return acc;
		}, {} as Record<string, string>);
	}, [example]);

	if (!example) return null
	const handleBackClick = () => {
		if (location.state?.from) {
			navigate(location.state?.from);
		} else {
			navigate('/modeling/examples');
		}
	};

	const renderFields = (
	values: typeof initialValues,
	setFieldValue: (field: string, value: any) => void
) =>
	[...example.commands]
		.sort((a, b) => a.order_index - b.order_index)
		.map((cmd) => {
			const label = cmd.title.replace(`${example.title_verbose}, `, "");
			const options = [...cmd.values].map((v) => v.toString()); 

			return (
				<Autocomplete
					key={cmd.title}
					options={options}
					freeSolo={options.length === 0}
					value={values[cmd.title] ?? ""}
					onChange={(_, value) => {
						setFieldValue(cmd.title, value ?? "");
					}}
					onBlur={() => {
						setFieldValue(cmd.title, values[cmd.title]);
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label={label}
							variant="outlined"
							fullWidth
						/>
					)}
					className={styles.content__field}
				/>
			);
		});


	return (
		<div className={styles.settings}>
			<div className={styles.content}>
				<div className={styles.content__header}>
					<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={handleBackClick} />
					<h2>Задание параметров моделирования</h2>
				</div>
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
					onSubmit={(values) => console.log("Submitted:", values)}
				>
					{({ values, setFieldValue }) => (
						<Form className={styles.content__form}>
							{renderFields(values, setFieldValue)}

							<PrimaryButton
								label="Смоделировать"
								type="submit"
								fullWidth
								size="s"
							/>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default ModelSettings
