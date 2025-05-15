import { Option } from "./types";


export function isOptionsChanged(
	currentOptions: Option[],
	initialOptions: Option[],
	deletedIds: number[]
): boolean {
	const normalize = (arr: Option[]) =>
		arr.map((opt) => opt.title.trim()).sort();

	const current = normalize(currentOptions);
	const initial = normalize(initialOptions);

	if (deletedIds.length > 0) return true;
	if (current.length !== initial.length) return true;

	for (let i = 0; i < current.length; i++) {
		if (current[i] !== initial[i]) return true;
	}

	return false;
}