import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const secondaryButtonStyles: SxProps<Theme> = {
	textTransform: "none",
	borderRadius: "8px",
	paddingInline: "32px",
	paddingBlock: "10px",
	transition: "0.3s ease",
	borderColor: "var(--mui-palette-primary-main)",
	"&:hover": {
		backgroundColor: "var(--mui-palette-primary-light)",
		color: "var(--mui-palette-secondary-main)",
		borderColor: "var(--mui-palette-primary-main)",
	}
};