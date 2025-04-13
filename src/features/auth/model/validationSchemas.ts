import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
	username: Yup.string()
		.matches(/^[a-zA-Z0-9._-]+$/, "Некорректный ник")
		.required("Ник обязателен"),
	password: Yup.string()
		.min(8, 'Пароль должен быть не менее 8 символов'),
});

export const registrationValidationSchema = Yup.object({
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
	password: Yup.string()
		.required('Пароль обязателен')
		.min(8, 'Пароль должен быть не менее 8 символов')
		.matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
		.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
	password2: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Подтверждение пароля обязательно'),
});

export const passwordConfirmValidationSchema = Yup.object({
	new_password: Yup.string()
		.required('Пароль обязателен')
		.min(8, 'Пароль должен быть не менее 8 символов')
		.matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
		.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
	new_password2: Yup.string()
		.oneOf([Yup.ref('new_password'), null], 'Пароли должны совпадать')
		.required('Подтверждение пароля обязательно'),
});

export const resetPasswordValidationSchema = Yup.object({
	email: Yup.string()
		.email('Неправильно указана Электронная почта. Пример: geant4@mail.com')
		.required('Email обязателен'),
});