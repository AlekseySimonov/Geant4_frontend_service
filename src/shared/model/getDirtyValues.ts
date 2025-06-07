type AnyObject = Record<string, any>;

export function deepEqual(a: any, b: any): boolean {
	if (a === b) return true;

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) return false;
		}
		return true;
	}

	if (
		typeof a === "object" && a !== null &&
		typeof b === "object" && b !== null
	) {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);
		if (keysA.length !== keysB.length) return false;
		for (const key of keysA) {
			if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
				return false;
			}
		}
		return true;
	}

	return false;
}


export function getDirtyValues<T extends AnyObject>(
	initial: T,
	current: T,
	path: string[] = []
): Partial<T> {
	const dirty = {} as Partial<T>;

	for (const key of Object.keys(current) as Array<keyof T>) {
		const initVal = initial[key];
		const currVal = current[key];
		const currentPath = [...path, String(key)];
		
		if (currentPath.includes("files")) {
			if (initVal !== currVal) {
				dirty[key] = currVal;
			}
			continue;
		}

		if (deepEqual(initVal, currVal)) continue;

		if (
			Array.isArray(initVal) &&
			Array.isArray(currVal)
		) {
			if (!deepEqual(initVal, currVal)) {
				dirty[key] = currVal;
			}
			continue;
		}

		if (
			typeof initVal === 'object' && initVal !== null &&
			typeof currVal === 'object' && currVal !== null
		) {
			const child = getDirtyValues(initVal, currVal, currentPath);
			if (Object.keys(child).length > 0) {
				dirty[key] = child as any;
			}
		} else {
			dirty[key] = currVal;
		}
	}

	return dirty;
}


