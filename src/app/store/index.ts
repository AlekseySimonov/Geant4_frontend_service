import { authApi } from '@/pages/authPage/api'
import { authReducer } from '@/pages/authPage/model'
import { mutationStatusReducer } from '@/shared/model/slices'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		mutationStatus: mutationStatusReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch