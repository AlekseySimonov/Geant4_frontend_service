import { authApi } from '@/pages/authPage/api';  
import { authReducer } from '@/pages/authPage/model';  
import { profileApi } from '@/pages/profilePage/api';  
import { globalLoadingReducer } from '@/shared/model';
import { configureStore } from '@reduxjs/toolkit';  

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		globalLoading: globalLoadingReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;