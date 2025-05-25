import { apiSlice } from '../services/apiSlice';

export interface BudgetRequestBody {
	title: string;
	is_public: boolean;
	description: string;
	color: string;
}

export interface Budget {
	id: string;
	title: string;
	created_at: string;
	updated_at: string;
	is_public: boolean;
	owner: {
		id: string;
		username: string;
	};
	description: string;
	color: string;
}

export interface PaginatedList<T> {
	items: T[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

export interface PaginationRequestBody {
	page: number;
	size: number;
}

const budgetApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveBudgets: builder.query<
			PaginatedList<Budget>,
			PaginationRequestBody
		>({
			query: ({ size, page }) => ({
				url: `/budgets?size=${size}&page=${page}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useRetrieveBudgetsQuery } = budgetApiSlice;
