import reducer, { addRequest, removeRequest } from "@/shared/model/slices";
import { resetRequests } from "@/shared/model/slices/globalLoadingSlice";


interface GlobalLoadingState {
	activeRequests: string[];
	isLoading: boolean;
}

describe('globalLoadingSlice', () => {
	const initialState: GlobalLoadingState = {
		activeRequests: [],
		isLoading: false,
	};

	it('should handle addRequest', () => {
		const state = reducer(initialState, addRequest('1'));
		expect(state.activeRequests).toContain('1');
		expect(state.isLoading).toBe(true);
	});

	it('should not add duplicate requests', () => {
		const stateWithRequest = reducer(initialState, addRequest('1'));
		const stateAfterAddingDuplicate = reducer(stateWithRequest, addRequest('1'));
		expect(stateAfterAddingDuplicate.activeRequests).toHaveLength(1);
	});

	it('should handle removeRequest', () => {
		const stateWithRequest = reducer(initialState, addRequest('1'));
		const stateAfterRemoval = reducer(stateWithRequest, removeRequest('1'));
		expect(stateAfterRemoval.activeRequests).not.toContain('1');
		expect(stateAfterRemoval.isLoading).toBe(false);
	});

	it('should handle removeRequest when multiple requests are active', () => {
		const stateWithRequests = reducer(initialState, addRequest('1'));
		const stateWithMultipleRequests = reducer(stateWithRequests, addRequest('2'));
		const stateAfterRemoval = reducer(stateWithMultipleRequests, removeRequest('1'));
		expect(stateAfterRemoval.activeRequests).toContain('2');
		expect(stateAfterRemoval.isLoading).toBe(true);
	});

	it('should handle resetRequests', () => {
		const stateWithRequests = reducer(initialState, addRequest('1'));
		const stateAfterReset = reducer(stateWithRequests, resetRequests());
		expect(stateAfterReset.activeRequests).toHaveLength(0);
		expect(stateAfterReset.isLoading).toBe(false);
	});
});