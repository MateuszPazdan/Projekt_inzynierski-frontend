import { apiSlice } from '../services/apiSlice';

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

export interface PortfolioRequestBody {
	title: string;
	is_public: boolean;
	description: string;
	color: string;
}

export interface PortfolioTransactionRequestBody {
	description: string;
	transaction_type: 'buy' | 'sell';
	amount: number;
	price_per_unit: number;
	transaction_date: string;
	crypto: { symbol: string };
}

export interface PortfolioInfo {
	title: string;
	is_public: boolean;
	description: string;
	color: string;
	id: string;
	owner_id: string;
	created_at: string;
	updated_at: string;
	total_watched: number;
	total_transactions: number;
	total_investment: number;
	profit_loss: number;
	profit_loss_percentage: number;
	profit_loss_24h: number;
	percentage_profit_loss_24h: number;
	current_value: number;
}

export interface PortfolioTransaction {
	id: string;
	transaction_type: string;
	amount: number;
	price_per_unit: number;
	transaction_date: string;
	profit_loss: number;
	profit_loss_percentage: number;
	description: string;
}

export interface PortfolioSummary {
	total_investment: number;
	current_value: number;
	total_percentage_profit_loss_24h: number;
	total_profit_loss_24h: number;
	total_profit_loss_percentage: number;
	total_profit_loss: number;
	total_portfolios: number;
	total_transactions: number;
	holdings_percentage: { [key: string]: number };
	historical_value_7d: { date: string; value: number }[];
	historical_value_1m: { date: string; value: number }[];
	historical_value_1y: { date: string; value: number }[];
	top_gainer_24h: WatchedCryptoDetails | WatchedStockDetails;
}

export interface CryptoPortfolioDetails extends PortfolioInfo {
	watched_cryptos: WatchedCrypto[];
	holdings_percentage: { [key: string]: number };
	historical_value_7d: { date: string; value: number }[];
	historical_value_1m: { date: string; value: number }[];
	historical_value_1y: { date: string; value: number }[];
}

export interface PortfolioCryptoTransaction extends PortfolioTransaction {
	crypto: WatchedCryptoDetails;
}

export interface WatchedCrypto {
	id: number;
	crypto: WatchedCryptoDetails;
	percentage_profit_loss_24h: number;
	profit_loss_24h: number;
	profit_loss: number;
	profit_loss_percentage: number;
	total_invested: number;
	avg_buy_price: number;
	holdings: number;
	current_value: number;
}
export interface WatchedCryptoDetails {
	symbol: string;
	icon: string;
	name: string;
	price: number;
	price_change_percentage_24h: number;
}

export interface StockPortfolioDetails extends PortfolioInfo {
	watched_stocks: WatchedStocks[];
	holdings_percentage: { [key: string]: number };
	historical_value_7d: { date: string; value: number }[];
	historical_value_1m: { date: string; value: number }[];
	historical_value_1y: { date: string; value: number }[];
}

export interface PortfolioStockTransaction extends PortfolioTransaction {
	stock: WatchedStockDetails;
}

export interface WatchedStocks {
	id: number;
	stock: WatchedStockDetails;
	percentage_profit_loss_24h: number;
	profit_loss_24h: number;
	profit_loss: number;
	profit_loss_percentage: number;
	total_invested: number;
	avg_buy_price: number;
	holdings: number;
	current_value: number;
}

export interface WatchedStockDetails {
	symbol: string;
	name: string;
	price: number;
	price_change_percentage_24h: number;
}

const portfolioApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveCryptoPortfoliosSummary: builder.query<PortfolioSummary, void>({
			query: () => ({
				url: `/portfolios/cryptos/summary`,
				method: 'GET',
			}),
			providesTags: ['CryptoPortfolios'],
		}),
		retrieveCryptoPortfolios: builder.query<
			PaginatedResponse<PortfolioInfo>,
			{ page: number; size: number }
		>({
			query: ({ page, size }) => ({
				url: `/portfolios/cryptos?size=${size}&page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CryptoPortfolios'],
		}),
		createCryptoPortfolio: builder.mutation<
			PortfolioInfo,
			PortfolioRequestBody
		>({
			query: (body) => ({
				url: `/portfolios/cryptos`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['CryptoPortfolios'],
		}),
		modifyCryptoPortfolio: builder.mutation<
			PortfolioInfo,
			{ portfolioId: string; portfolio: PortfolioRequestBody }
		>({
			query: ({ portfolio, portfolioId }) => ({
				url: `/portfolios/cryptos/${portfolioId}`,
				method: 'PATCH',
				body: portfolio,
			}),
			invalidatesTags: (result, error, { portfolioId }) => [
				{ type: 'CryptoPortfolio', id: portfolioId },
				{ type: 'CryptoPortfolios' },
			],
		}),
		deleteCryptoPortfolio: builder.mutation<void, string>({
			query: (portfolioId) => ({
				url: `/portfolios/cryptos/${portfolioId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CryptoPortfolios'],
		}),
		deleteAllTransactionsCryptoPortfolio: builder.mutation<
			void,
			{
				portfolioId: string;
				cryptoSymbol?: string;
			}
		>({
			query: ({ portfolioId, cryptoSymbol = '' }) => ({
				url: `/portfolios/cryptos/${portfolioId}/transactions?crypto_symbol=${cryptoSymbol}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { portfolioId }) => [
				{ type: 'CryptoPortfolios' },
				{ type: 'CryptoPortfolio', id: portfolioId },
				{ type: 'CryptoPortfolioTransactions', id: portfolioId },
			],
		}),
		retrieveCryptoPortfolioDetails: builder.query<
			CryptoPortfolioDetails,
			string
		>({
			query: (portfolioId) => ({
				url: `/portfolios/cryptos/${portfolioId}`,
				method: 'GET',
			}),
			providesTags: (result, error, portfolioId) => [
				{ type: 'CryptoPortfolio', id: portfolioId },
			],
		}),
		addWatchedCryptoPortfolio: builder.mutation<
			void,
			{ portfolioId: string; crypto_symbol: string }
		>({
			query: ({ portfolioId, crypto_symbol }) => ({
				url: `/portfolios/cryptos/${portfolioId}/watched_cryptos/${crypto_symbol}`,
				method: 'POST',
			}),
			invalidatesTags: (result, error, { portfolioId }) => [
				{ type: 'CryptoPortfolio', id: portfolioId },
				{ type: 'CryptoPortfolios' },
			],
		}),
		deleteWatchedCryptoPortfolio: builder.mutation<
			void,
			{ portfolio_id: string; crypto_symbol: string }
		>({
			query: ({ portfolio_id, crypto_symbol }) => ({
				url: `/portfolios/cryptos/${portfolio_id}/watched_cryptos/${crypto_symbol}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { portfolio_id }) => [
				{ type: 'CryptoPortfolio', id: portfolio_id },
				{ type: 'CryptoPortfolios' },
				{ type: 'CryptoPortfolioTransactions', id: portfolio_id },
			],
		}),
		retrieveCryptoPortfolioTransactions: builder.query<
			PaginatedResponse<PortfolioCryptoTransaction>,
			{
				portfolioId: string;
				cryptoSymbol: string;
				page?: number;
				size?: number;
			}
		>({
			query: ({ portfolioId, cryptoSymbol, page = 1, size = 30 }) => ({
				url: `/portfolios/cryptos/${portfolioId}/transactions?crypto_symbol=${cryptoSymbol}&page=${page}&size=${size}`,
				method: 'GET',
			}),
			providesTags: (result, error, { portfolioId }) => [
				{ type: 'CryptoPortfolioTransactions', id: portfolioId },
			],
		}),
		createCryptoPortfolioTransaction: builder.mutation<
			PortfolioCryptoTransaction,
			{ portfolio_id: string; transaction: PortfolioTransactionRequestBody }
		>({
			query: ({ portfolio_id, transaction }) => ({
				url: `/portfolios/cryptos/${portfolio_id}/transactions`,
				method: 'POST',
				body: transaction,
			}),
			invalidatesTags: (result, error, { portfolio_id }) => [
				{ type: 'CryptoPortfolio', id: portfolio_id },
				{ type: 'CryptoPortfolios' },
				{ type: 'CryptoPortfolioTransactions', id: portfolio_id },
			],
		}),
		updateCryptoPortfolioTransaction: builder.mutation<
			PortfolioCryptoTransaction,
			{
				portfolio_id: string;
				transaction_id: string;
				transaction: PortfolioTransactionRequestBody;
			}
		>({
			query: ({ portfolio_id, transaction_id, transaction }) => ({
				url: `/portfolios/cryptos/${portfolio_id}/transactions/${transaction_id}`,
				method: 'PATCH',
				body: transaction,
			}),
			invalidatesTags: (result, error, { portfolio_id }) => [
				{ type: 'CryptoPortfolio', id: portfolio_id },
				{ type: 'CryptoPortfolios' },
				{ type: 'CryptoPortfolioTransactions', id: portfolio_id },
			],
		}),
		deleteCurrentAssetPortfolioTransactionMutation: builder.mutation<
			void,
			{ portfolio_id: string; transaction_id?: string }
		>({
			query: ({ portfolio_id, transaction_id = '' }) => ({
				url: `/portfolios/cryptos/${portfolio_id}/transactions/${transaction_id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { portfolio_id }) => [
				{ type: 'CryptoPortfolio', id: portfolio_id },
				{ type: 'CryptoPortfolios' },
				{ type: 'CryptoPortfolioTransactions', id: portfolio_id },
			],
		}),

		retrieveStockPortfoliosSummary: builder.query<PortfolioSummary, void>({
			query: () => ({
				url: `/portfolios/stocks/summary`,
				method: 'GET',
			}),
			providesTags: ['StockPortfolios'],
		}),
		retrieveStockPortfolios: builder.query<
			PaginatedResponse<PortfolioInfo>,
			{ page: number; size: number }
		>({
			query: ({ page, size }) => ({
				url: `/portfolios/stocks?size=${size}&page=${page}`,
				method: 'GET',
			}),
			providesTags: ['StockPortfolios'],
		}),
		createStockPortfolio: builder.mutation<PortfolioInfo, PortfolioRequestBody>(
			{
				query: (body) => ({
					url: `/portfolios/stocks`,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['StockPortfolios'],
			}
		),
		modifyStockPortfolio: builder.mutation<
			PortfolioInfo,
			{ portfolioId: string; portfolio: PortfolioRequestBody }
		>({
			query: ({ portfolio, portfolioId }) => ({
				url: `/portfolios/stocks/${portfolioId}`,
				method: 'PATCH',
				body: portfolio,
			}),
			invalidatesTags: (result, error, { portfolioId }) => [
				{ type: 'StockPortfolio', id: portfolioId },
				{ type: 'StockPortfolios' },
			],
		}),
		deleteStockPortfolio: builder.mutation<void, string>({
			query: (portfolioId) => ({
				url: `/portfolios/stocks/${portfolioId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['StockPortfolios'],
		}),
		deleteAllTransactionsStockPortfolio: builder.mutation<
			void,
			{
				portfolioId: string;
				stockSymbol?: string;
			}
		>({
			query: ({ portfolioId, stockSymbol = '' }) => ({
				url: `/portfolios/stocks/${portfolioId}/transactions?stock_symbol=${stockSymbol}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { portfolioId }) => [
				{ type: 'StockPortfolios' },
				{ type: 'StockPortfolio', id: portfolioId },
				{ type: 'StockPortfolioTransactions', id: portfolioId },
			],
		}),
		retrieveStockPortfolioDetails: builder.query<StockPortfolioDetails, string>(
			{
				query: (portfolioId) => ({
					url: `/portfolios/stocks/${portfolioId}`,
					method: 'GET',
				}),
				providesTags: (result, error, portfolioId) => [
					{ type: 'StockPortfolio', id: portfolioId },
				],
			}
		),
		addWatchedStockPortfolio: builder.mutation<
			void,
			{ portfolioId: string; stock_symbol: string }
		>({
			query: ({ portfolioId, stock_symbol }) => ({
				url: `/portfolios/stocks/${portfolioId}/watched_stocks/${stock_symbol}`,
				method: 'POST',
			}),
			invalidatesTags: (result, error, { portfolioId }) => [
				{ type: 'StockPortfolio', id: portfolioId },
				{ type: 'StockPortfolios' },
			],
		}),
		retrieveStockPortfolioTransactions: builder.query<
			PaginatedResponse<PortfolioStockTransaction>,
			{
				portfolioId: string;
				stockSymbol: string;
				page?: number;
				size?: number;
			}
		>({
			query: ({ portfolioId, stockSymbol, page = 1, size = 30 }) => ({
				url: `/portfolios/stocks/${portfolioId}/transactions?stock_symbol=${stockSymbol}&page=${page}&size=${size}`,
				method: 'GET',
			}),
			providesTags: (result, error, { portfolioId }) => [
				{ type: 'StockPortfolioTransactions', id: portfolioId },
			],
		}),
	}),
});

export const {
	useRetrieveCryptoPortfoliosQuery,
	useRetrieveCryptoPortfoliosSummaryQuery,
	useCreateCryptoPortfolioMutation,
	useModifyCryptoPortfolioMutation,
	useDeleteCryptoPortfolioMutation,
	useDeleteAllTransactionsCryptoPortfolioMutation,
	useRetrieveCryptoPortfolioDetailsQuery,
	useAddWatchedCryptoPortfolioMutation,
	useDeleteWatchedCryptoPortfolioMutation,
	useRetrieveCryptoPortfolioTransactionsQuery,
	useCreateCryptoPortfolioTransactionMutation,
	useUpdateCryptoPortfolioTransactionMutation,
	useDeleteCurrentAssetPortfolioTransactionMutationMutation,

	useRetrieveStockPortfoliosSummaryQuery,
	useRetrieveStockPortfoliosQuery,
	useCreateStockPortfolioMutation,
	useModifyStockPortfolioMutation,
	useDeleteStockPortfolioMutation,
	useDeleteAllTransactionsStockPortfolioMutation,
	useRetrieveStockPortfolioDetailsQuery,
	useAddWatchedStockPortfolioMutation,
	useRetrieveStockPortfolioTransactionsQuery,
} = portfolioApiSlice;
