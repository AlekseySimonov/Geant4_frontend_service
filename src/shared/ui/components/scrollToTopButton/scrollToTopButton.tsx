import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./ScrollToTop.module.scss";

export const ScrollToTopButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		isVisible && (
			<div className={styles.scrollToTop} onClick={scrollToTop}>
				<KeyboardArrowUpIcon fontSize="large" />
			</div>
		)
	);
};