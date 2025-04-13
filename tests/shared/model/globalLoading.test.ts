import { globalLoading } from "@/shared/model";
import { addRequest, removeRequest } from "@/shared/model/slices";
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('globalLoading', () => {
	let store: ReturnType<typeof mockStore>;
	let dispatch: jest.Mock;

	beforeEach(() => {
		store = mockStore({});
		dispatch = jest.fn();
	});

	it('should dispatch addRequest when disableLoading is not true', async () => {
		const payload = {};
		const queryFulfilled = Promise.resolve();

		globalLoading(payload, { dispatch, queryFulfilled, requestId: '1' });

		await queryFulfilled;

		expect(dispatch).toHaveBeenCalledWith(addRequest('1'));
	});

	it('should dispatch removeRequest after query is fulfilled', async () => {
		const payload = {};
		const queryFulfilled = Promise.resolve();

		globalLoading(payload, { dispatch, queryFulfilled, requestId: '1' });

		await queryFulfilled.finally(() => { });

		expect(dispatch).toHaveBeenCalledWith(removeRequest('1'));
	});

	it('should dispatch removeRequest after query fails', async () => {
		const payload = {};
		const queryFulfilled = Promise.reject();

		globalLoading(payload, { dispatch, queryFulfilled, requestId: '1' });

		await queryFulfilled.catch(() => { });

		expect(dispatch).toHaveBeenCalledWith(removeRequest('1'));
	});

	it('should not dispatch anything if disableLoading is true', () => {
		const payload = { disableLoading: true };
		const queryFulfilled = Promise.resolve();

		globalLoading(payload, { dispatch, queryFulfilled, requestId: '1' });

		expect(dispatch).not.toHaveBeenCalled();
	});

	it('should handle requestId correctly', () => {
		const payload = {};
		const queryFulfilled = Promise.resolve();

		globalLoading(payload, { dispatch, queryFulfilled, requestId: 'test-id' });

		expect(dispatch).toHaveBeenCalledWith(addRequest('test-id'));
	});
});