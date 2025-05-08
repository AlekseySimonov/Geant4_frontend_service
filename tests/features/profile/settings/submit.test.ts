import { handleSubmit } from "@/features/profile/settings/model";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { createFormikHelpersMock } from '../../../helpers/formikHelpersMock';

jest.mock("@/shared/ui/components/alert/model/alertSlice");

describe("handleSubmit", () => {
	const values = {
		first_name: "Иван",
		last_name: "Иванов",
		email: "new@example.com",
		new_username: "new_ivan",
	};
	const helpers = createFormikHelpersMock();
	const mockDispatch = jest.fn();
	const mockNavigate = jest.fn();

	const prevEmail = "old@example.com";
	const prevUsername = "ivan123";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("updates profile and username, dispatches alert, navigates", async () => {
		const mockPatch = jest.fn().mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });
		const mockUsername = jest.fn().mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });

		const submit = handleSubmit(
			mockPatch,
			mockUsername,
			prevEmail,
			prevUsername,
			mockDispatch,
			mockNavigate
		);

		await expect(submit(values, helpers)).resolves.not.toThrow();

		expect(mockPatch).toHaveBeenCalledWith({
			first_name: "Иван",
			last_name: "Иванов",
			email: "new@example.com",
		});
		expect(mockUsername).toHaveBeenCalledWith({ new_username: "new_ivan" });
		expect(mockDispatch).toHaveBeenCalledWith(
			showAlert({
				message:
					"Мы отправили письмо на новый адрес. Подтвердите его, чтобы завершить обновление почты.",
				severity: "info",
			})
		);
		expect(mockNavigate).toHaveBeenCalledWith("/profile");
	});

	it("does not call postUsername or dispatch if email/username not changed", async () => {
		const unchangedValues = {
			...values,
			email: prevEmail,
			new_username: prevUsername,
		};
		const mockPatch = jest.fn().mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });
		const mockUsername = jest.fn();

		const submit = handleSubmit(
			mockPatch,
			mockUsername,
			prevEmail,
			prevUsername,
			mockDispatch,
			mockNavigate
		);

		await expect(submit(unchangedValues, helpers)).resolves.not.toThrow();
		expect(mockPatch).toHaveBeenCalled();
		expect(mockUsername).not.toHaveBeenCalled();
		expect(mockDispatch).not.toHaveBeenCalled();
		expect(mockNavigate).toHaveBeenCalledWith("/profile");
	});

	const errorCases = [
		{
			name: "status 400: username taken",
			error: { status: 400, data: { username: ["error"] } },
			expected: () => expect(helpers.setErrors).toHaveBeenCalledWith({ username: "Этот логин уже занят" }),
		},
		{
			name: "status 400: email taken",
			error: { status: 400, data: { email: ["error"] } },
			expected: () => expect(helpers.setErrors).toHaveBeenCalledWith({ email: "Эта почта уже используется" }),
		},
		{
			name: "status 400: unknown error",
			error: { status: 400, data: { other: ["error"] } },
			expected: () => expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова."),
		},
		{
			name: "status 500",
			error: { status: 500 },
			expected: () => expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова."),
		},
	];

	errorCases.forEach(({ name, error, expected }) => {
		it(`handles ${name}`, async () => {
			const mockPatch = jest.fn().mockReturnValue({ unwrap: jest.fn().mockRejectedValue(error) });
			const mockUsername = jest.fn();

			const submit = handleSubmit(
				mockPatch,
				mockUsername,
				prevEmail,
				prevUsername,
				mockDispatch,
				mockNavigate
			);
			await expect(submit(values, helpers)).resolves.not.toThrow();
			expected();
		});
	});
});