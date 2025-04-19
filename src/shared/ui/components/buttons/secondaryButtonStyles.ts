import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const secondaryButtonStyles: SxProps<Theme> = {
	textTransform: "none",
	borderRadius: "8px",
	transition: "0.3s ease",
	borderColor: "var(--mui-palette-primary-main)",
	height: "max-content",
	"&:hover": {
		backgroundColor: "var(--mui-palette-primary-light)",
		color: "var(--mui-palette-secondary-main)",
		borderColor: "var(--mui-palette-primary-main)",
	},
	"@media (max-width: 400px)": {
		paddingInline: "10px",
	},
	"&:disabled": {
		backgroundColor: "var(--mui-palette-action-disabled)",
		color: "var(--mui-palette-primary-main)",
		cursor: "not-allowed",
	}
};