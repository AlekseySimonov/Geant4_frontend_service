import { useDebounce } from "@/shared/hooks";
import { renderHook, act } from "@testing-library/react";

jest.useFakeTimers();

describe("useDebounce", () => {
	it("should return the initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("test", 500));

		expect(result.current).toBe("test");
	});

	it("should update the debounced value after the specified delay", () => {
		let value = "initial";

		const { result, rerender } = renderHook(() => useDebounce(value, 300));

		expect(result.current).toBe("initial");

		value = "updated";
		rerender();

		expect(result.current).toBe("initial");

		act(() => {
			jest.advanceTimersByTime(300);
		});

		expect(result.current).toBe("updated");
	});

	it("should reset the timer if value changes before delay", () => {
		let value = "first";

		const { result, rerender } = renderHook(() => useDebounce(value, 500));

		expect(result.current).toBe("first");

		value = "second";
		rerender();

		act(() => {
			jest.advanceTimersByTime(300);
		});

		expect(result.current).toBe("first");

		value = "third";
		rerender();

		act(() => {
			jest.advanceTimersByTime(500); 
		});

		expect(result.current).toBe("third");
	});

	it("should handle zero delay correctly", () => {
		let value = "zero";

		const { result, rerender } = renderHook(() => useDebounce(value, 0));

		expect(result.current).toBe("zero");

		value = "new";
		rerender();

		act(() => {
			jest.advanceTimersByTime(0);
		});

		expect(result.current).toBe("new");
	});

	it("should clear timeout on unmount", () => {
		const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
	
		const { unmount } = renderHook(() => useDebounce("value", 400));
	
		unmount();
	
		expect(clearTimeoutSpy).toHaveBeenCalled();
		
		clearTimeoutSpy.mockRestore();
	});
});