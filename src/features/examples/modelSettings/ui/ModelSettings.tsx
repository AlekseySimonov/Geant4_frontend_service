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
		}, {} as Record<string, string | number>);
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
		example.commands
			.slice()
			.sort((a, b) => a.order_index - b.order_index)
			.map((cmd) => {
				const label = cmd.title.replace(`${example.title_verbose}, `, "");
				const value = values[cmd.title] ?? "";

				const options = cmd.command_list?.command_values?.map(v => v.toString()) ?? [];

				const isNumberDefault = !isNaN(Number(cmd.default)) && isFinite(Number(cmd.default));

				if (isNumberDefault) {
					return (
						<TextField
							key={cmd.title}
							type="number"
							label={label}
							variant="outlined"
							fullWidth
							value={value}
							onChange={(e) => {
								const val = e.target.value;
								const parsed = val === "" ? "" : Number(val);
								setFieldValue(cmd.title, parsed);
							}}
							inputProps={{
								min: cmd.min ?? undefined,
								max: cmd.max ?? undefined,
							}}
							className={styles.content__field}
						/>
					);
				}

				if (options.length > 0) {
					return (
						<Autocomplete
							key={cmd.title}
							options={options}
							value={value}
							onChange={(_, newValue) => {
								setFieldValue(cmd.title, newValue ?? "");
							}}
							onBlur={() => {
								setFieldValue(cmd.title, value);
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
				}

				return (
					<TextField
						key={cmd.title}
						label={label}
						variant="outlined"
						fullWidth
						value={value}
						disabled
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
