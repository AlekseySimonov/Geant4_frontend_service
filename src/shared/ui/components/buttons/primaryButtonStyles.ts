import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const primaryButtonStyles: SxProps<Theme> = {
	paddingInline: "48px",
	paddingBlock: "20px",
	backgroundColor: "var(--mui-palette-primary-main)",
	color: "var(--mui-palette-secondary-main)",
	width: "max-content",
	borderRadius: "8px",
	transition: "0.2s ease",
	fontWeight: 500,
	height: "max-content",
	boxShadow: "none",
	"&:hover": {
		boxShadow: "var(--mui-shadows-4)",
	},
	"@media (max-width: 900px)": {
		paddingInline: "40px",
		paddingBlock: "16px",
	},
	"&:disabled": {
	backgroundColor: "var(--mui-palette-action-disabled)",
	color: "var(--mui-palette-primary-main)",
	cursor: "not-allowed",
},
};