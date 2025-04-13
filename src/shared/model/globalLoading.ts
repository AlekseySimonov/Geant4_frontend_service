import { addRequest, removeRequest } from "./slices";

export const globalLoading = (
	payload: { disableLoading?: boolean },
	{ dispatch, queryFulfilled, requestId }: any
) => {
	if (payload?.disableLoading) return;

	dispatch(addRequest(requestId));

	queryFulfilled
		.catch(() => {
			dispatch(removeRequest(requestId));
		})
		.finally(() => {
			dispatch(removeRequest(requestId));
		});
};