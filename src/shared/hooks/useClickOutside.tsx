import { useEffect } from "react";

type Func = () => void;

export function useClickOutside<T extends HTMLElement>(
	ref: React.RefObject<T>,
	func: Func
) {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				func();
			}
		};

		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [ref, func]);
}