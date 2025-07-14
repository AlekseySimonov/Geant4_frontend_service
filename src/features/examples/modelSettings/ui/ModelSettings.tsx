import { useLocation, useNavigate, useParams } from "react-router";
import styles from "./_modelSettings.module.scss"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Formik } from 'formik';
import { Form } from 'formik';
import { useGetExampleQuery, usePostExampleMutation } from "@/pages/examplesPage/api/examplesApi";
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { buildValidationSchema, submitExample } from "../model";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
const ModelSettings: React.FC = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const dispatch: AppDispatch = useDispatch();

	const { id } = useParams<{ id: string }>();
	const { data: example, isLoading, isError } = useGetExampleQuery(Number(id))
	const [postExample] = usePostExampleMutation();

	const validationSchema = useMemo(() => buildValidationSchema(example), [example]);

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

	return (
		<div className={styles.settings}>
			<div className={styles.content}>
				<div className={styles.content__header}>
					<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={handleBackClick} />
					<h2>Задание параметров моделирования</h2>
				</div>

				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={submitExample(Number(id), postExample, navigate, dispatch)}
				>
					{({ values, setFieldValue, status, isValid, dirty, errors, touched, setFieldTouched }) => (
						<Form className={styles.content__form}>
							{example.commands
								.slice()
								.sort((a, b) => a.order_index - b.order_index)
								.map((cmd) => {
									const name = cmd.title;
									const label = name.replace(`${example.title_verbose}, `, "");
									const value = values[name] ?? "";
									const error = touched[name] && Boolean(errors[name]);
									const helperText = touched[name] ? (errors[name] as string) : "";

									const options = cmd.command_list?.command_values?.map((v) => v.toString()) ?? [];
									const isNumberField = !isNaN(Number(cmd.default)) && isFinite(Number(cmd.default));

									if (isNumberField) {
										return (
											<TextField
												key={name}
												name={name}
												type="number"
												label={label}
												variant="outlined"
												fullWidth
												value={value}
												onBlur={() => setFieldTouched(name, true)}
												onChange={(e) => {
													const val = e.target.value;
													setFieldValue(name, val === "" ? "" : Number(val));
												}}
												inputProps={{
													min: cmd.min ?? undefined,
													max: cmd.max ?? undefined,
												}}
												error={error}
												helperText={helperText}
												className={styles.content__field}
											/>
										);
									}

									if (options.length > 0) {
										return (
											<Autocomplete
												key={name}
												options={options}
												value={value}
												onChange={(_, newValue) => {
													setFieldValue(name, newValue ?? "");
												}}
												onBlur={() => {
													setFieldTouched(name, true);
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														name={name}
														label={label}
														variant="outlined"
														fullWidth
														error={touched[name] && Boolean(errors[name])}
														helperText={touched[name] ? (errors[name] as string) : ""}
													/>
												)}
												className={styles.content__field}
											/>
										);
									}

									return (
										<TextField
											key={name}
											name={name}
											label={label}
											variant="outlined"
											fullWidth
											value={value}
											disabled
											className={styles.content__field}
										/>
									);
								})}

							{status && <div className={styles.content__form__errorMessage}>{status}</div>}

							<div className={styles.content__form__submit}>
								<PrimaryButton
									label="Смоделировать"
									type="submit"
									disabled={!(isValid)}
									fullWidth
									size="s"
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ModelSettings;
