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
	date: string;
	open_price: number;
	close_price: number;
	low_price: number;
	high_price: number;
	volume: number;
	interval: string;
	period: string;
}

export interface StockPricePerformance {
	price: number;
	price_change_percentage_1h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	price_change_percentage_30d: number;
	price_change_percentage_1y: number;
	price_change_percentage_max: number;
	updated_at: string;
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

export interface CryptoHistoricalData {
	date: string;
	open_price: number;
	close_price: number;
	low_price: number;
	high_price: number;
	volume: number;
	interval: string;
	period: string;
}

export interface StockBase {
	symbol: string;
	name: string;
	currency: string;
	price: number;
	price_change_percentage_24h: number;
}

export interface CryptoBase extends StockBase {
	icon: string;
}

export interface AssetsPerformance {
	global_crypto_data: {
		total_volume_24h: number;
		total_market_cap: number;
		top_gainers_24h: CryptoBase[];
		top_losers_24h: CryptoBase[];
		top_market_cap_rank: {
			symbol: string;
			name: string;
			currency: string;
			icon: string;
			price: number;
			price_change_percentage_24h: number;
			price_change_percentage_7d: number;
			price_change_percentage_30d: number;
			price_change_percentage_1y: number;
			price_change_percentage_max: number;
		}[];
	};
	global_stock_data: {
		total_volume_24h: number;
		total_market_cap: number;
		top_gainers_24h: StockBase[];
		top_losers_24h: StockBase[];
		top_market_cap_rank: {
			symbol: string;
			name: string;
			currency: string;
			price: number;
			price_change_percentage_24h: number;
			price_change_percentage_7d: number;
			price_change_percentage_30d: number;
			price_change_percentage_1y: number;
			price_change_percentage_max: number;
		}[];
	};
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
			StockHistoricalData[],
			{ stock_symbol: string; period: string }
		>({
			query: ({ stock_symbol, period }) => ({
				url: `/portfolio/assets/stocks/${stock_symbol}/historical?period=${period}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 600,
		}),
		retrieveStockPricePerformance: builder.query<
			StockPricePerformance,
			{ stock_symbol: string }
		>({
			query: ({ stock_symbol }) => ({
				url: `/portfolio/assets/stocks/${stock_symbol}/price-performance`,
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
		retrieveCryptoHistoricalPrice: builder.query<
			CryptoHistoricalData[],
			{ crypto_symbol: string; period: string }
		>({
			query: ({ crypto_symbol, period }) => ({
				url: `/portfolio/assets/cryptos/${crypto_symbol}/historical?period=${period}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 600,
		}),
		retrieveAssetsPerformance: builder.query<AssetsPerformance, void>({
			query: () => ({
				url: `/portfolio/assets/global-performance`,
				method: 'GET',
			}),
			keepUnusedDataFor: 600,
		}),
	}),
});

export const {
	useRetrieveStocksQuery,
	useRetrieveStockHistoricalPriceQuery,
	useRetrieveStockPricePerformanceQuery,
	useRetrieveCryptosQuery,
	useRetrieveCryptoHistoricalPriceQuery,
	useRetrieveAssetsPerformanceQuery,
} = marketApiSlice;
