import { Button } from "@mui/material";
import { Link } from "react-router";
import { secondaryButtonStyles } from "./secondaryButtonStyles";
import { getSizeStyles } from "./getSizeStyles";

interface SecondaryButtonProps {
	label: string;
	link?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
	fullWidth?: boolean;
	type?: "button" | "submit" | "reset";
	size?: "s" | "m" | "l" | "height-40";
	disabled?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
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
			variant="outlined"
			component={Link}
			to={link}
			onClick={onClick}
			type={type}
			disabled={disabled}
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