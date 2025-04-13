import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalLoadingState {
	activeRequests: string[];
	isLoading: boolean;
}

const initialState: GlobalLoadingState = {
	activeRequests: [],
	isLoading: false,
};

const globalLoadingSlice = createSlice({
	name: 'globalLoading',
	initialState,
	reducers: {
		addRequest(state, action: PayloadAction<string>) {
			if (!state.activeRequests.includes(action.payload)) {
				state.activeRequests.push(action.payload);
				state.isLoading = true;
			}
		},
		removeRequest(state, action: PayloadAction<string>) {
			state.activeRequests = state.activeRequests.filter(id => id !== action.payload);
			state.isLoading = state.activeRequests.length > 0;
		},
		resetRequests(state) {
			state.activeRequests = [];
			state.isLoading = false;
		},
	},
});

export const { addRequest, removeRequest, resetRequests } = globalLoadingSlice.actions;
export default globalLoadingSlice.reducer;