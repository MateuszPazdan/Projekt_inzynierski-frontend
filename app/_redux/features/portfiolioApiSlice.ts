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
	}),
});

export const {
	useRetrieveCryptoPortfoliosQuery,
	useCreateCryptoPortfolioMutation,
} = portfolioApiSlice;
