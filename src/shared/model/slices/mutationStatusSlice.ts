import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MutationStatus {
	isLoading: boolean;
}

const initialState: MutationStatus = {
	isLoading: false,
};

const mutationStatusSlice = createSlice({
	name: 'mutationStatus',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
});

export const { setLoading } = mutationStatusSlice.actions;
export default mutationStatusSlice.reducer;