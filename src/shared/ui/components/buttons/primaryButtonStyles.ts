import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const primaryButtonStyles: SxProps<Theme> = {
	backgroundColor: "var(--mui-palette-primary-main)",
	color: "var(--mui-palette-secondary-main)",
	borderRadius: "8px",
	transition: "0.2s ease",
	height: "max-content",
	boxShadow: "none",
	textTransform: "none",
	lineHeight: 'none',
	"&:hover": {
		boxShadow: "var(--mui-shadows-4)",
	},
	"&:disabled": {
	backgroundColor: "var(--mui-palette-action-disabled)",
	color: "var(--mui-palette-primary-main)",
	cursor: "not-allowed",
},
};