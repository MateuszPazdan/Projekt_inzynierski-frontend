import { apiSlice } from '../services/apiSlice';

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

export interface Stock {
	symbol: string;
	name: string;
	price: number;
	currency: string;
	volume_24h: number;
	market_cap: number;
	market_state: string;
	price_change_percentage_1h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	circulating_supply: number;
	market_cap_rank: number;
}

export interface StockHistoricalData {
	historical_data: {
		date: string;
		open_price: number;
		close_price: number;
		low_price: number;
		high_price: number;
		volume: number;
		interval: string;
		period: string;
	}[];
	additional_info: {
		price_change_percentage_24h: number;
		price_change_percentage_7d: number;
		price_change_percentage_30d: number;
		price_change_percentage_1y: number;
		price_change_percentage_max: number;
		current_price: number;
	};
}

export interface Crypto {
	symbol: string;
	name: string;
	price: number;
	currency: string;
	volume_24h: number;
	market_cap: number;
	price_change_percentage_1h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	circulating_supply: number;
	market_cap_rank: number;
	icon: string;
}

const marketApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveStocks: builder.query<
			PaginatedResponse<Stock>,
			{ search?: string; page?: number; size?: number }
		>({
			query: ({ search = '', page = 1, size = 50 }) => ({
				url: `/portfolio/assets/stocks?search=${search}&page=${page}&size=${size}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 600,
		}),
		retrieveStockHistoricalPrice: builder.query<
			StockHistoricalData,
			{ stock_symbol: string; period: string }
		>({
			query: ({ stock_symbol, period }) => ({
				url: `/portfolio/assets/stocks/${stock_symbol}/historical?period=${period}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 600,
		}),
		retrieveCryptos: builder.query<
			PaginatedResponse<Crypto>,
			{ search?: string; page?: number; size?: number }
		>({
			query: ({ search = '', page = 1, size = 50 }) => ({
				url: `/portfolio/assets/cryptos?search=${search}&page=${page}&size=${size}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 600,
		}),
	}),
});

export const {
	useRetrieveStocksQuery,
	useRetrieveStockHistoricalPriceQuery,
	useRetrieveCryptosQuery,
} = marketApiSlice;
