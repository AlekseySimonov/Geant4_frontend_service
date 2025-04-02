import { RegistrationForm } from "@/features";
import { useRegistrationMutation } from "@/pages/authPage/api/authApi";
import { screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

jest.mock("@/pages/authPage/model/authSlice", () => ({
	useRegistrationMutation: jest.fn(),
}));

describe("RegistrationForm API", () => {
	let registrationMock: jest.Mock

	beforeEach(() => {
		cleanup()
		registrationMock = jest.fn();
		(useRegistrationMutation as jest.Mock).mockReturnValue([registrationMock])
		render(
			<MemoryRouter>
				<RegistrationForm />
			</MemoryRouter>
		);

		fireEvent.change(screen.getByTestId("first_name"), { target: { value: "Иван" } });
		fireEvent.change(screen.getByTestId("last_name"), { target: { value: "Иванов" } });
		fireEvent.change(screen.getByTestId("email"), { target: { value: "ivan@example.com" } });
		fireEvent.change(screen.getByTestId("username"), { target: { value: "ivan" } });
		fireEvent.change(screen.getByTestId("password"), { target: { value: "Qwerty123!" } });
		fireEvent.change(screen.getByTestId("password2"), { target: { value: "Qwerty123!" } });
	})

	test("status 200", async () => {
		registrationMock.mockReturnValue({
			status: 200
		});

		fireEvent.click(screen.getByText("Зарегистрироваться"));

		await waitFor(() => {
			expect(screen.queryByText("Этот ник уже занят")).not.toBeInTheDocument()
			expect(screen.queryByText("Эта почта уже используется")).not.toBeInTheDocument()
			expect(screen.queryByText("Произошла ошибка. Попробуйте снова.")).not.toBeInTheDocument()
		})
	})

	test("status 400 with email and username errors", async () => {
		registrationMock.mockRejectedValue({
			status: 400,
			data: {
				username: "Этот ник уже занят",
				email: 'Эта почта уже используется',
			},
		});

		fireEvent.click(screen.getByTestId("submit"));

		await waitFor(() => {
			expect(screen.queryByText("Этот ник уже занят")).toBeInTheDocument();
			expect(screen.queryByText("Эта почта уже используется")).toBeInTheDocument();
			expect(screen.queryByText("Произошла ошибка. Попробуйте снова.")).not.toBeInTheDocument();
		});
	});

	// test("status 500", async () => {
	// 	registrationMock.mockResolvedValue({
	// 		status: 500,
	// 		message: "Internal Server Error",
	// 	});

	// 	fireEvent.click(screen.getByText("Зарегистрироваться"));

	// 	await waitFor(() => expect(screen.getByText("Произошла ошибка. Попробуйте снова.")).toBeInTheDocument());
	// })

	// test("status 400 with email error", async () => {
	// 	registrationMock.mockResolvedValue({
	// 		status: 400,
	// 		data: {
	// 			email: "Эта почта уже используется",
	// 		},
	// 	});

	// 	fireEvent.click(screen.getByText("Зарегистрироваться"));

	// 	await waitFor(() => {
	// 		expect(screen.queryByText("Этот ник уже занят")).not.toBeInTheDocument();
	// 		expect(screen.queryByText("Эта почта уже используется")).toBeInTheDocument();
	// 		expect(screen.queryByText("Произошла ошибка. Попробуйте снова.")).not.toBeInTheDocument();
	// 	});
	// });

	// test("status 400 with username error", async () => {
	// 	registrationMock.mockResolvedValue({
	// 		status: 400,
	// 		data: {
	// 			username: "Этот ник уже занят",
	// 		},
	// 	});

	// 	fireEvent.click(screen.getByText("Зарегистрироваться"));

	// 	await waitFor(() => {
	// 		expect(screen.queryByText("Этот ник уже занят")).toBeInTheDocument();
	// 		expect(screen.queryByText("Эта почта уже используется")).not.toBeInTheDocument();
	// 		expect(screen.queryByText("Произошла ошибка. Попробуйте снова.")).not.toBeInTheDocument();
	// 	});
	// });
})