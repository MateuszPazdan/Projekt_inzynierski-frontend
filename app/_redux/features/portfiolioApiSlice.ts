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
	total_watched_cryptos: number;
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

export interface CryptoPortfolioDetails extends PortfolioInfo {
	watched_cryptos: WatchedCrypto[];
	cryptos_percentage_holdings: { [key: string]: number };
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

const portfolioApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
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
			invalidatesTags: () => [{ type: 'CryptoPortfolios' }],
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
	}),
});

export const {
	useRetrieveCryptoPortfoliosQuery,
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
} = portfolioApiSlice;
