import { Example } from '@/shared/types';
import * as Yup from 'yup';

export function buildValidationSchema(example: Example | undefined) {
	if (!example) return Yup.object({});

	const shape: Record<string, Yup.AnySchema> = {};

	for (const cmd of example.commands) {
		const key = cmd.title;

		if (cmd.command_list?.command_values?.length) {
			const allowedValues = cmd.command_list.command_values.map(String);
			const defaultValue = cmd.default?.toString();

			shape[key] = Yup.string()
				.oneOf(allowedValues, 'Недопустимое значение')
				.test(
					'is-required-or-default',
					'Обязательное поле',
					(value) => value === defaultValue || allowedValues.includes(value ?? '')
				);

			continue;
		}

		const isNumber = !isNaN(Number(cmd.default)) && isFinite(Number(cmd.default));

		if (isNumber) {
			let schema = Yup.number()
				.typeError('Должно быть числом')
				.required('Обязательное поле');

			if (typeof cmd.min === 'number') {
				schema = schema.min(cmd.min, `Минимум: ${cmd.min}`);
			}

			if (typeof cmd.max === 'number') {
				schema = schema.max(cmd.max, `Максимум: ${cmd.max}`);
			}

			shape[key] = schema;
			continue;
		}

		shape[key] = Yup.string().notRequired();
	}

	return Yup.object().shape(shape);
}


