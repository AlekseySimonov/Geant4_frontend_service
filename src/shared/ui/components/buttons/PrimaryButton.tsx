import { Button } from "@mui/material";
import { Link } from "react-router";
import { primaryButtonStyles } from "./primaryButtonStyles";

interface PrimaryButtonProps {
	label: string;
	link?: string;
	onClick?: () => void;
	fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, link, onClick, fullWidth = false }) => {
	return (
			<Button
				variant="contained"
				color="primary"
				component={link ? Link : "button"}
				to={link}
				onClick={onClick}
				sx={{
					...primaryButtonStyles,
					width: fullWidth ? "100%" : "max-content",
				}}
			>
				{label}
			</Button>

	);
};
