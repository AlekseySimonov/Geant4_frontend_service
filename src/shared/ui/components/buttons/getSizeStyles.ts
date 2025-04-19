export const getSizeStyles = (size: "s" | "m" | "l" ) => {
	switch (size) {
		case "s":
			return { paddingBlock: "8px", paddingInline: "32px"  };
		case "m":
			return { paddingBlock: "20px", paddingInline: "40px" };
		case "l":
			return { paddingBlock: "24px", paddingInline: "48px" };
		default:
			return { paddingBlock: "20px", paddingInline: "40px" };
	}
};