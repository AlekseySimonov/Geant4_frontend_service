import { FormikHelpers } from "formik";
import { usePostExampleMutation } from "@/pages/examplesPage/api/examplesApi";

type FormValues = Record<string, string | number>;
type PostExampleFn = ReturnType<typeof usePostExampleMutation>[0];

export const submitExample =
	(id: number, postExample: PostExampleFn) =>
	async (
		values: FormValues,
		{ setStatus }: FormikHelpers<FormValues>
	): Promise<void> => {
		try {
			await postExample({
				id,
				payload: values,
			}).unwrap();

			console.log("Моделирование успешно запущено");
			// Здесь можно делать редирект или открыть диалог успеха
		} catch (error: any) {
			console.error("Ошибка отправки:", error);

			if (error?.status === 400) {
				setStatus("Ошибка в параметрах моделирования");
			} else {
				setStatus("Не удалось отправить данные. Попробуйте снова.");
			}
		}
	};
