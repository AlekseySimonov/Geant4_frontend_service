export const getOrderingLabel = (ordering: string): string => {
	switch (ordering) {
		case "-creation_date":
			return "По дате обновления ↓";
		case "creation_date":
			return "По дате обновления ↑";
		case "title_verbose.keyword":
			return "По названию A–Z";
		case "-title_verbose.keyword":
			return "По названию Z–A";
		default:
			return "Без сортировки";
	}
};
