import { useRef, useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useClickOutside } from "@/shared/hooks";

afterEach(cleanup);

describe("useClickOutside", () => {
	it("should call the callback when clicking outside the element", () => {
		const handleClickOutside = jest.fn();

		const Component = () => {
			const ref = useRef<HTMLDivElement>(null);
			useClickOutside(ref, handleClickOutside);

			return (
				<div>
					<div ref={ref} data-testid="inside">Inside</div>
					<div data-testid="outside">Outside</div>
				</div>
			);
		};

		const { getByTestId } = render(<Component />);
		fireEvent.mouseDown(getByTestId("outside"));

		expect(handleClickOutside).toHaveBeenCalledTimes(1);
	});

	it("should not call the callback when clicking inside the element", () => {
		const handleClickOutside = jest.fn();

		const Component = () => {
			const ref = useRef<HTMLDivElement>(null);
			useClickOutside(ref, handleClickOutside);

			return (
				<div>
					<div ref={ref} data-testid="inside">Inside</div>
					<div data-testid="outside">Outside</div>
				</div>
			);
		};

		const { getByTestId } = render(<Component />);
		fireEvent.mouseDown(getByTestId("inside"));

		expect(handleClickOutside).not.toHaveBeenCalled();
	});

	it("should not throw if ref.current is null", () => {
		const handleClickOutside = jest.fn();

		const Component = () => {
			const [visible, setVisible] = useState(false);
			const ref = useRef<HTMLDivElement>(null);
			useClickOutside(ref, handleClickOutside);

			return (
				<div>
					<button onClick={() => setVisible(true)} data-testid="show">
						Show
					</button>
					{visible && <div ref={ref} data-testid="inside">Inside</div>}
					<div data-testid="outside">Outside</div>
				</div>
			);
		};

		const { getByTestId } = render(<Component />);
		fireEvent.mouseDown(getByTestId("outside"));

		expect(handleClickOutside).not.toHaveBeenCalled();
	});

	it("should remove event listener on unmount", () => {
		const handleClickOutside = jest.fn();

		const Component = ({ visible }: { visible: boolean }) => {
			const ref = useRef<HTMLDivElement>(null);
			useClickOutside(ref, handleClickOutside);

			return visible ? (
				<div>
					<div ref={ref} data-testid="inside">Inside</div>
					<div data-testid="outside">Outside</div>
				</div>
			) : null;
		};

		const { rerender } = render(<Component visible={true} />);
		rerender(<Component visible={false} />);
		fireEvent.mouseDown(document);

		expect(handleClickOutside).not.toHaveBeenCalled();
	});
});