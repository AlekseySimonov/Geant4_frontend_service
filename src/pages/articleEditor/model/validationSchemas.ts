import * as Yup from 'yup';

const elementSchema = Yup.object().shape({

	text: Yup.string().when('type', {
		is: 'text',
		then: (schema) => schema.trim().required('Текст обязателен'),
		otherwise: (schema) => schema.strip(),
	}),

	files: Yup.array().when('type', {
		is: (val: string) => val === 'webp' || val === 'csv',
		then: (schema) =>
			schema
				.min(1, 'Файл обязателен')
				.of(Yup.mixed().required()),
		otherwise: (schema) => schema.notRequired(),
	}),
});

const subscriptionSchema = Yup.object().shape({
	title: Yup.string().trim().required('Заголовок блока обязателен'),
	elements: Yup.array()
		.of(elementSchema)
		.min(1, 'Хотя бы один элемент обязателен'),
});

export const articleValidationSchema = Yup.object().shape({
	title: Yup.string().required('Название обязательно'),
	description: Yup.string().required('Описание обязательно'),
	category: Yup.number().min(1, 'Категория обязательна').required(),
	chapter: Yup.number().min(1, 'Глава обязательна').required(),

	subscriptions: Yup.array()
		.of(subscriptionSchema)
		.min(1, 'Хотя бы один блок обязателен'),
});