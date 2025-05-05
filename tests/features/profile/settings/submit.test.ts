// import { handleSubmit } from '@/features/profile/settings/model/submit';
// import { FormikHelpers } from 'formik';

// const baseValues = {
// 	first_name: "John",
// 	last_name: "Doe",
// 	email: "test@example.com",
// 	new_username: "newuser"
// };

// const prevEmail = "test@example.com";
// const prevUsername = "olduser";

// const helpers = {
// 	setErrors: jest.fn(),
// 	setStatus: jest.fn()
// } as unknown as FormikHelpers<any>;

// let alertMock: jest.SpyInstance;

// beforeEach(() => {
// 	jest.clearAllMocks();

// 	alertMock = jest.spyOn(window, "alert").mockImplementation(() => { });
// });

// describe("handleSubmit", () => {
// 	it("should send data successfully without email or username changes", async () => {
// 		const patchProfile = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockResolvedValue(undefined)
// 		});

// 		const postUsername = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockResolvedValue(undefined)
// 		});

// 		const submit = handleSubmit(patchProfile, postUsername, baseValues.email, baseValues.new_username);
// 		await submit(baseValues, helpers);

// 		expect(patchProfile).toHaveBeenCalledWith({
// 			first_name: "John",
// 			last_name: "Doe",
// 			email: "test@example.com"
// 		});

// 		expect(postUsername).not.toHaveBeenCalled();
// 		expect(helpers.setErrors).not.toHaveBeenCalled();
// 		expect(helpers.setStatus).not.toHaveBeenCalled();
// 		expect(alertMock).not.toHaveBeenCalled();
// 	});

// 	it("should call alert if email was changed", async () => {
// 		const patchProfile = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockResolvedValue(undefined)
// 		});

// 		const postUsername = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockResolvedValue(undefined)
// 		});

// 		const submit = handleSubmit(patchProfile, postUsername, "old@example.com", baseValues.new_username);
// 		await submit(baseValues, helpers);

// 		expect(alertMock).toHaveBeenCalledWith(
// 			"Мы отправили письмо на новый адрес. Подтвердите его, чтобы завершить смену почты."
// 		);
// 	});

// 	it("should send new username if changed", async () => {
// 		const patchProfile = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockResolvedValue(undefined)
// 		});

// 		const postUsername = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockResolvedValue(undefined)
// 		});

// 		const submit = handleSubmit(patchProfile, postUsername, baseValues.email, "another_username");
// 		await submit(baseValues, helpers);

// 		expect(postUsername).toHaveBeenCalledWith({ new_username: "newuser" });
// 	});

// 	it("should handle 400 error with field messages", async () => {
// 		const patchProfile = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockRejectedValue({
// 				status: 400,
// 				data: { username: ["already taken"], email: ["already used"] }
// 			})
// 		});

// 		const postUsername = jest.fn();

// 		const submit = handleSubmit(patchProfile, postUsername, prevEmail, prevUsername);
// 		await submit(baseValues, helpers);

// 		expect(helpers.setErrors).toHaveBeenCalledWith({
// 			username: "Этот логин уже занят",
// 			email: "Эта почта уже используется"
// 		});
// 		expect(helpers.setStatus).not.toHaveBeenCalled();
// 	});

// 	it("should handle 400 error with unknown fields", async () => {
// 		const patchProfile = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockRejectedValue({
// 				status: 400,
// 				data: { somethingElse: ["error"] }
// 			})
// 		});

// 		const postUsername = jest.fn();

// 		const submit = handleSubmit(patchProfile, postUsername, prevEmail, prevUsername);
// 		await submit(baseValues, helpers);

// 		expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова.");
// 	});

// 	it("should handle other server errors", async () => {
// 		const patchProfile = jest.fn().mockReturnValue({
// 			unwrap: jest.fn().mockRejectedValue({
// 				status: 500
// 			})
// 		});

// 		const postUsername = jest.fn();

// 		const submit = handleSubmit(patchProfile, postUsername, prevEmail, prevUsername);
// 		await submit(baseValues, helpers);

// 		expect(helpers.setStatus).toHaveBeenCalledWith("Произошла ошибка. Попробуйте снова.");
// 	});
// });