import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
	message: string;
	visible: boolean;
	severity: 'info' | 'error' ;
}

const initialState: AlertState = {
	message: '',
	visible: false,
	severity: 'info',
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert(state, action: PayloadAction<{ message: string; severity?: AlertState['severity'] }>) {
			state.message = action.payload.message;
			state.visible = true;
			state.severity = action.payload.severity || 'info';
		},
		hideAlert(state) {
			state.visible = false;
		},
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;