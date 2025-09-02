import { apiSlice } from '../services/apiSlice';
import { Crypto, Stock } from './marketApiSlice';

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

export interface GlobalSearchResult {
	stocks: Stock[];
	cryptos: Crypto[];
}

const globalApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveGlobalSearch: builder.query<GlobalSearchResult, { search: string }>(
			{
				query: ({ search }) => ({
					url: `/assets/global-search?search=${search}`,
					method: 'GET',
				}),
			}
		),
	}),
});

export const { useRetrieveGlobalSearchQuery, useLazyRetrieveGlobalSearchQuery } = globalApiSlice;
