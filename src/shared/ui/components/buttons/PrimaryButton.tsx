import { Button } from "@mui/material";
import { Link } from "react-router";
import { primaryButtonStyles } from "./primaryButtonStyles";
import { getSizeStyles } from "./getSizeStyles";

interface PrimaryButtonProps {
	label: string;
	link?: string;
	onClick?: () => void;
	fullWidth?: boolean;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	size?: "s" | "m" | "l";
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	label,
	link,
	onClick,
	fullWidth = false,
	type = "button",
	disabled = false,
	size = "s"
}) => {
	return (
		<Button
			variant="contained"
			color="primary"
			component={link ? Link : "button"}
			to={link}
			onClick={onClick}
			type={type}
			disabled={disabled}
			sx={{
				...primaryButtonStyles,
				...getSizeStyles(size),
				width: fullWidth ? "100%" : "max-content",
			}}
		>
			{label}
		</Button>
	);
};
