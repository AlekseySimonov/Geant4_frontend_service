import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const searchStyles: SxProps<Theme> = {
	height: "40px",
	color: "var(--mui-palette-primary-main)",
	"& .MuiAutocomplete-inputRoot": {
		borderRadius: 8,
		backgroundColor: "none",
		paddingLeft: "16px"
	},
	"& .MuiOutlinedInput-root": {
		paddingInline: "11px",
		paddingBlock: 0,
		position: "relative",
	},
	"& .MuiInputBase-input": {
		padding: 0,
	},
	"& .MuiAutocomplete-popupIndicator": {
		display: "none",
	},
	"& .MuiAutocomplete-input": {
		paddingBottom: "0px",
	},
};