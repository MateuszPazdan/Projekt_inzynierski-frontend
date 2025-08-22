import { apiSlice } from '../services/apiSlice';

export interface StockHistoricalData {
	date: string;
	stock_id: number;
	close_price: number;
	low_price: number;
	interval: string;
	open_price: number;
	id: number;
	high_price: number;
	volume: number;
	period: string;
}

const marketApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveStockHistoricalPrice: builder.query<
			StockHistoricalData[],
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
