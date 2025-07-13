import * as Yup from 'yup';
import { Example } from '@/shared/types';

export function buildValidationSchema(example: Example | undefined) {
	if (!example) return Yup.object({});
	const shape: Record<string, Yup.AnySchema> = {};

	for (const cmd of example.commands) {
		const isNumber = !isNaN(Number(cmd.default)) && isFinite(Number(cmd.default));
		const label = cmd.title.replace(`${example.title_verbose}, `, "");

		if (isNumber) {
			let schema = Yup.number()
				.typeError(`${label} должно быть числом`)
				.required(`${label} обязательно`);

			if (cmd.min !== undefined) {
				schema = schema.min(cmd.min, `${label} ≥ ${cmd.min}`);
			}
			if (cmd.max !== undefined) {
				schema = schema.max(cmd.max, `${label} ≤ ${cmd.max}`);
			}

			shape[cmd.title] = schema;
		} else {
			shape[cmd.title] = Yup.string()
				.trim()
				.required(`${label} обязательно`);
		}
	}

	return Yup.object().shape(shape);
}
