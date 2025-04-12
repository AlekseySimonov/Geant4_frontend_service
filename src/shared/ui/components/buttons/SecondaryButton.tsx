import { Button } from "@mui/material";
import { Link } from "react-router";
import { secondaryButtonStyles } from "./secondaryButtonStyles";
import { getSizeStyles } from "./getSizeStyles";

interface SecondaryButtonProps {
	label: string;
	link?: string;
	onClick?: () => void;
	fullWidth?: boolean;
	type?: "button" | "submit" | "reset";
	size?: "s" | "m" | "l";
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
	label,
	link,
	onClick,
	fullWidth = false,
	type = "button",
	size = "s"
}) => {
	return (
		<Button
			variant="outlined"
			color="primary"
			component={Link}
			to={link}
			onClick={onClick}
			type={type}
			sx={{
				...secondaryButtonStyles,
				...getSizeStyles(size),
				width: fullWidth ? "100%" : "max-content",
			}}
		>
			{label}
		</Button>
	);
};