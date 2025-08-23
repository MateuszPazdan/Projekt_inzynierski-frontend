import { apiSlice } from '../services/apiSlice';

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

const marketApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveStockHistoricalPrice: builder.query<
			StockHistoricalData,
			{ stock_symbol: string; period: string }
		>({
			query: ({ stock_symbol, period }) => ({
				url: `/portfolio/assets/stocks/${stock_symbol}/historical?period=${period}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 900,
		}),
	}),
});

export const { useRetrieveStockHistoricalPriceQuery } = marketApiSlice;
