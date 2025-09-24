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

export interface AssetsInConverterResponse {
	stocks: ConverterAssetDetails[];
	cryptos: ConverterAssetDetails[];
	currencies: ConverterAssetDetails[];
}

export interface ConverterAssetDetails {
	symbol: string;
	name: string;
	icon?: string;
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
		retrieveAssetsInConverter: builder.query<AssetsInConverterResponse, void>({
			query: () => ({
				url: `assets/global-assets-in-converter`,
				method: 'GET',
			}),
		}),
		convertAssets: builder.query<
			{ converted_amount: number },
			{ convert_from: string; convert_to: string; amount: number }
		>({
			query: ({ convert_from, convert_to, amount }) => ({
				url: `assets/global-converter?convert_from=${convert_from}&convert_to=${convert_to}&amount=${amount}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useRetrieveGlobalSearchQuery,
	useLazyRetrieveGlobalSearchQuery,
	useRetrieveAssetsInConverterQuery,
	useConvertAssetsQuery,
} = globalApiSlice;
