import { authApi } from '@/pages/authPage/api';  
import { profileApi } from '@/pages/profilePage/api';  
import { globalLoadingReducer } from '@/shared/model';
import { configureStore } from '@reduxjs/toolkit';
import avatarReducer from "@/features/avatar/avatarSlice";
import { docApi } from '@/pages/documentationPage/api';
import alertReducer from '@/shared/ui/components/alert/model/alertSlice';
import { examplesApi } from '@/pages/examplesPage';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[docApi.reducerPath]: docApi.reducer,
		[examplesApi.reducerPath]: examplesApi.reducer,
		globalLoading: globalLoadingReducer,
		avatar: avatarReducer,
		alert: alertReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware( {serializableCheck: false })
			.concat(authApi.middleware)
			.concat(profileApi.middleware)
			.concat(docApi.middleware)
			.concat(examplesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;