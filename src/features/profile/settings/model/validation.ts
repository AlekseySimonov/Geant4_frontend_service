import * as Yup from 'yup';

export const validationSchema = Yup.object({
	first_name: Yup.string()
		.required('Имя обязательно')
		.matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Имя может содержать только буквы'),

	last_name: Yup.string()
		.required('Фамилия обязательна')
		.matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Фамилия может содержать только буквы'),

	email: Yup.string()
		.email('Неправильно указана Электронная почта. Пример: geant4@mail.com')
		.required('Email обязателен'),

	username: Yup.string()
		.required('Логин обязателен')
		.matches(/^[a-zA-Z0-9]+$/, 'Логин должен содержать только латинские буквы и цифры'),
});