import { Button } from "@mui/material";
import { Link } from "react-router";
import { secondaryButtonStyles } from "./secondaryButtonStyles";

interface SecondaryButtonProps {
	label: string;
	link?: string;
	onClick?: () => void;
	fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, link, onClick, fullWidth = false }) => {
	return (
		<Button
			variant="outlined"
			color="primary"
			component={Link}
			to={link}
			onClick={onClick}
			sx={{
				...secondaryButtonStyles,
				width: fullWidth ? "100%" : "max-content",
			}}
		>
			{label}
		</Button>
	);
};