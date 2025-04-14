import * as Yup from 'yup';

export const settingsValidationSchema = Yup.object({
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

export const changePasswordValidationSchema = Yup.object({
	old_password: Yup.string()
		.required('Пароль обязателен')
		.min(8, 'Пароль должен быть не менее 8 символов')
		.matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
		.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
	new_password: Yup.string()
		.oneOf([Yup.ref('new_password'), null], 'Пароли должны совпадать')
		.required('Подтверждение пароля обязательно'),
});