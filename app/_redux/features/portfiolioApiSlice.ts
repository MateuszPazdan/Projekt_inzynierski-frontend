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

export interface PortfolioInfo {
	title: string;
	is_public: boolean;
	description: string;
	color: string;
	id: string;
	owner_id: string;
	created_at: string;
	updated_at: string;
}

export interface CryptoTransaction {
	id: string;
	transaction_type: string;
	amount: number;
	price_per_unit: number;
	transaction_date: string;
	crypto: {
		symbol: string;
	};
}

export interface CryptoPortfolioDetails extends PortfolioInfo {
	crypto_transactions: CryptoTransaction[];
	watched_cryptos: {
		id: number;
		crypto: {
			symbol: string;
		};
	}[];
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
		deleteAllTransactionsCryptoPortfolio: builder.mutation<void, string>({
			query: (portfolioId) => ({
				url: `/portfolios/cryptos/${portfolioId}/transactions`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, portfolioId) => [
				{ type: 'CryptoPortfolios' },
				{ type: 'CryptoPortfolio', id: portfolioId },
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
} = portfolioApiSlice;
