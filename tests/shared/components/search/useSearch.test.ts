import { ArticlesTypes } from '@/shared/types';
import { useSearch } from '@/shared/ui/components/search/model/useSearch';
import { renderHook, act, waitFor } from '@testing-library/react';

jest.useFakeTimers();

describe('useSearch', () => {

	it('should search with valid input', async () => {
		const onSearch = jest.fn(() => Promise.resolve([{ title: 'Test Article', id: 1 }]));
		const { result, rerender } = renderHook(() => useSearch({ onSearch, onOptionSelect: jest.fn(), searchValue: 'test' }));
		act(() => {
			jest.advanceTimersByTime(500);
		});
		await waitFor(() => {
			expect(result.current.options).toEqual([{ title: 'Test Article', id: 1 }]);
		});
		expect(onSearch).toHaveBeenCalledTimes(1);
		expect(result.current.options).toEqual([{ title: 'Test Article', id: 1 }]);
	});

	it('should not search with invalid input', async () => {
		const onSearch = jest.fn(() => Promise.resolve(null));
		const { result } = renderHook(() => useSearch({ onSearch, onOptionSelect: jest.fn(), searchValue: 'test' }));
		act(() => {
			jest.advanceTimersByTime(500);
		});
		expect(onSearch).toHaveBeenCalledTimes(1);
		expect(result.current.options).toEqual([]);
	});

	it('should not search with input length less than or equal to 3', async () => {
		const onSearch = jest.fn();
		const { result, rerender } = renderHook(() => useSearch({ onSearch, onOptionSelect: jest.fn(), searchValue: 'te' }));
		act(() => {
			jest.advanceTimersByTime(500);
		});
		expect(onSearch).not.toHaveBeenCalled();
		expect(result.current.open).toBe(false);
	});

	it('should call onOptionSelect callback', () => {
		const onOptionSelect = jest.fn();
		const { result } = renderHook(() => useSearch({ onSearch: jest.fn(), onOptionSelect, searchValue: '' }));
		const option = { title: 'Test Article', id: 1 };
		result.current.handleOptionClick(option);
		expect(onOptionSelect).toHaveBeenCalledTimes(1);
		expect(onOptionSelect).toHaveBeenCalledWith(option.title);
	});

	it('should focus input on handleSearchClick', () => {
		const input = document.createElement('input');
		input.focus = jest.fn();
		const div = document.createElement('div');
		div.appendChild(input);

		const { result } = renderHook(() => useSearch({ onSearch: jest.fn(), onOptionSelect: jest.fn(), searchValue: ''}));
		act(() =>{
			result.current.searchRef.current = div; result.current.handleSearchClick() 
		});
		expect(input.focus).toHaveBeenCalledTimes(1);
	});

	it('should suppress next search on handleOptionClick', () => {
		const { result } = renderHook(() => useSearch({onSearch: jest.fn(), onOptionSelect: jest.fn(), searchValue: ''}));
		const option: ArticlesTypes = { title: 'Test Article', id: 1 };
		act(() => {
			result.current.handleOptionClick(option);
		});
		expect(result.current.searchText).toBe(option.title);
		expect(result.current.open).toBe(false);
	});

	it('should set loading state', async () => {
		const onSearch = jest.fn(() => Promise.resolve([{ title: 'Test Article', id: 1 }]));
		const { result } = renderHook(() => useSearch({ onSearch, onOptionSelect: jest.fn(), searchValue: 'test' }));
		act(() => {
			jest.advanceTimersByTime(500);
		});
		expect(result.current.loading).toBe(true);
		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});
	});
	it('should handle error from onSearch gracefully', async () => {
		const error = new Error('Network error');
		const onSearch = jest.fn(() => Promise.reject(error));
	
		const { result } = renderHook(() =>
			useSearch({ onSearch, onOptionSelect: jest.fn(), searchValue: 'test' })
		);
	
		act(() => {
			jest.advanceTimersByTime(500);
		});
	
		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.options).toEqual([]);
			expect(result.current.open).toBe(false);
			expect(onSearch).toHaveBeenCalledTimes(1);
		});
	});
});