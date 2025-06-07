import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
	message: string;
	visible: boolean;
	severity: 'info' | 'error';
	id: number;
}

const initialState: AlertState = {
	message: '',
	visible: false,
	severity: 'info',
	id: 0,
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert(state, action: PayloadAction<{ message: string; severity?: AlertState['severity'] }>) {
			state.message = action.payload.message;
			state.visible = true;
			state.severity = action.payload.severity || 'info';
			state.id = Date.now();
		},
		hideAlert(state) {
			state.visible = false;
			state.message = '';
			state.id = 0;
		},
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;