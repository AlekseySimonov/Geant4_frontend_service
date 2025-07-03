export const getOrderingLabel = (ordering: string): string => {
	switch (ordering) {
		case "-date_to_update":
			return "По дате обновления ↓";
		case "date_to_update":
			return "По дате обновления ↑";
		case "title_verbose":
			return "По названию A–Z";
		case "-title_verbose":
			return "По названию Z–A";
		default:
			return "Без сортировки";
	}
};
