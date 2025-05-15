import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	title: Yup.string(),
	options: Yup.array().of(
		Yup.object().shape({
			title: Yup.string().required('Введите название'),
		})
	),
});