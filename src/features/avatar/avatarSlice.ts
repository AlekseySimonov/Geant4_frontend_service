import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAvatar, getAvatar, patchAvatar, postAvatar } from "./actions";

interface AvatarState {
	url: string | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: AvatarState = {
	url: null,
	isLoading: false,
	error: null,
};

const avatarSlice = createSlice({
	name: 'avatar',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAvatar.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getAvatar.fulfilled, (state, action) => {
				if (state.url) {  
					URL.revokeObjectURL(state.url);  
					state.url = null;
				}  

				if (action.payload instanceof Blob) {
					state.url = URL.createObjectURL(action.payload);  
				} else {   
					state.url = null;
				}  
				state.isLoading = false; 
			})
			.addCase(getAvatar.rejected, (state) => {
				state.isLoading = false;
				state.error = 'Произошла ошибка';
			})

			.addCase(postAvatar.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(postAvatar.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(postAvatar.rejected, (state) => {
				state.isLoading = false;
				state.error = 'Произошла ошибка';
			})

			.addCase(patchAvatar.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(patchAvatar.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(patchAvatar.rejected, (state) => {
				state.isLoading = false;
				state.error = 'Произошла ошибка';
			})

			.addCase(deleteAvatar.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteAvatar.fulfilled, (state) => {
				URL.revokeObjectURL(state.url)
				state.url = null;
				state.isLoading = false;
			})
			.addCase(deleteAvatar.rejected, (state) => {
				state.isLoading = false;
				state.error = 'Произошла ошибка';
			});
	},
});

export default avatarSlice.reducer;