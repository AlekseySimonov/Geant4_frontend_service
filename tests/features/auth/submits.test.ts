import { loginSubmit, registrationSubmit, resetPasswordSubmit } from "@/features/auth/model";
import { FormValues } from "@/features/auth/types";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { createFormikHelpersMock } from "../../helpers/formikHelpersMock";

jest.mock('@/pages/authPage/api/authApi');
jest.mock('@/shared/ui/components/alert/model/alertSlice');
const mockRegistration = jest.fn().mockReturnValue({
	unwrap: jest.fn().mockResolvedValue({}),
});
const mockDispatch = jest.fn();
const values: FormValues = {
	first_name: "Иван",
	last_name: "Иванов",
	email: "ivan@example.com",
	username: "ivan123",
	password: "securePassword123",
	password2: "securePassword123",
};
const helpers = createFormikHelpersMock()
describe("registrationSubmit", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("success registration", async () => {
		mockRegistration.mockReturnValueOnce({
			unwrap: jest.fn().mockResolvedValue({}),
		});
		const submit = registrationSubmit(mockRegistration);
		await expect(submit(values, helpers, mockDispatch)).resolves.not.toThrow();
		expect(mockRegistration).toHaveBeenCalledWith(values);
		expect(mockDispatch).toHaveBeenCalledWith(
			showAlert({
				message: "Вы успешно зарегистрировались. Проверьте почту для подтверждения пароля",
				severity: "info",
			})
		);
	});

	const errorCases = [
		{
			name: "status 400: username is exist",
			error: { status: 400, data: { username: ["error"] } },
			expected: () => expect(helpers.setErrors).toHaveBeenCalledWith({ username: "Этот логин уже занят" }),
		},
		{
			name: "status 400: email is exist",
			error: { status: 400, data: { email: ["error"] } },
			expected: () => expect(helpers.setErrors).toHaveBeenCalledWith({ email: "Эта почта уже используется" }),
		},
		{
			name: "status 400: unknown error",
			error: { status: 400, data: { unknown: ["error"] } },
			expected: () => expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова."),
		},
		{
			name: "status 500",
			error: { status: 500 },
			expected: () => expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова."),
		},
	];

	errorCases.forEach(({ name, error, expected }) => {
		it(` ${name}`, async () => {
			mockRegistration.mockReturnValueOnce({
				unwrap: jest.fn().mockRejectedValue(error),
			});
			const submit = registrationSubmit(mockRegistration);
			await expect(submit(values, helpers, mockDispatch)).resolves.not.toThrow();
			expected();
		});
	});
});

describe("loginSubmit", () => {
	const values: FormValues = {
		username: "ivan123",
		password: "securePassword123",
	};
	const helpers = createFormikHelpersMock();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("successfully logs in and redirects", async () => {
		const mockLogin = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockResolvedValue({}),
		});
		delete (window as any).location;
		(window as any).location = { replace: jest.fn() };

		const submit = loginSubmit(mockLogin);
		await expect(submit(values, helpers)).resolves.not.toThrow();
		expect(mockLogin).toHaveBeenCalledWith(values);
		expect(window.location.replace).toHaveBeenCalledWith("/main");
	});

	const errorCases = [
		{
			name: "status 400",
			error: { status: 400 },
			expected: () =>
				expect(helpers.setStatus).toHaveBeenCalledWith("Неправильный ник или пароль"),
		},
		{
			name: "status 500",
			error: { status: 500 },
			expected: () =>
				expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова."),
		},
	];

	errorCases.forEach(({ name, error, expected }) => {
		it(`handles ${name} error`, async () => {
			const mockLogin = jest.fn().mockReturnValue({
				unwrap: jest.fn().mockRejectedValue(error),
			});
			const submit = loginSubmit(mockLogin);
			await expect(submit(values, helpers)).resolves.not.toThrow();
			expected();
		});
	});
});

describe("resetPasswordSubmit", () => {
	const values: FormValues = {
		email: "ivan@example.com",
	};
	const helpers = createFormikHelpersMock();
	const mockDispatch = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	it("successfully initiates password recovery and redirects", async () => {
		const mockRecovery = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockResolvedValue({}),
		});
		delete (window as any).location;
		(window as any).location = { replace: jest.fn() };

		const submit = resetPasswordSubmit(mockRecovery);
		await expect(submit(values, helpers, mockDispatch)).resolves.not.toThrow();

		expect(mockRecovery).toHaveBeenCalledWith(values);
		expect(mockDispatch).toHaveBeenCalledWith(
			showAlert({
				message: "Проверьте почту для сброса пароля",
				severity: "info",
			})
		);

		jest.runAllTimers();
		expect(window.location.replace).toHaveBeenCalledWith("/auth/login");
	});

	const errorCases = [
		{
			name: "status 400",
			error: { status: 400 },
			expected: () =>
				expect(helpers.setStatus).toHaveBeenCalledWith("Неправильно указана Электронная почта"),
		},
		{
			name: "status 500",
			error: { status: 500 },
			expected: () =>
				expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова"),
		},
	];

	errorCases.forEach(({ name, error, expected }) => {
		it(`handles ${name} error`, async () => {
			const mockRecovery = jest.fn().mockReturnValue({
				unwrap: jest.fn().mockRejectedValue(error),
			});
			const submit = resetPasswordSubmit(mockRecovery);
			await expect(submit(values, helpers, mockDispatch)).resolves.not.toThrow();
			expected();
		});
	});
});