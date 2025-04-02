import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthStatus: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
	},
});

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;