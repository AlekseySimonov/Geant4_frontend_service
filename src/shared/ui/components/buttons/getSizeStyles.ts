export const getSizeStyles = (size: "s" | "m" | "l" | "height-40" ) => {
	switch (size) {
		case "s":
			return { paddingBlock: "8px", paddingInline: "32px"  };
		case "m":
			return { paddingBlock: "20px", paddingInline: "40px" };
		case "l":
			return { paddingBlock: "24px", paddingInline: "48px" };
		case "height-40":
			return { height: "40px", paddingInline: "32px" };
		default:
			return { paddingBlock: "20px", paddingInline: "40px" };
	}
};