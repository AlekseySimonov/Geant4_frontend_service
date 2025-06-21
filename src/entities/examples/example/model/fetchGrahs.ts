
const API_URL = process.env.API_BASE_URL
export async function fetchGraphZip(id: number): Promise<any> {
	const response = await fetch(`${API_URL}/examples/${id}/example_geant/`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ detail: true })

	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Ошибка загрузки ZIP: ${response.status} ${errorText}`);
	}

	return await response.blob();
}