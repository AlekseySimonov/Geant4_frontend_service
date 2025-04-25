import { authApi } from '@/pages/authPage/api';  
import { profileApi } from '@/pages/profilePage/api';  
import { globalLoadingReducer } from '@/shared/model';
import { configureStore } from '@reduxjs/toolkit';
import avatarReducer from "@/features/avatar/avatarSlice";
import { docApi } from '@/pages/documentationPage/api';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[docApi.reducerPath]: docApi.reducer,
		globalLoading: globalLoadingReducer,
		avatar: avatarReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware( {serializableCheck: false })
			.concat(authApi.middleware)
			.concat(profileApi.middleware)
			.concat(docApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;