import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
	message: string;
	visible: boolean;
	severity: 'success' | 'error' ;
}

const initialState: AlertState = {
	message: '',
	visible: false,
	severity: 'success',
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert(state, action: PayloadAction<{ message: string; severity?: AlertState['severity'] }>) {
			state.message = action.payload.message;
			state.visible = true;
			state.severity = action.payload.severity || 'success';
		},
		hideAlert(state) {
			state.visible = false;
		},
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;