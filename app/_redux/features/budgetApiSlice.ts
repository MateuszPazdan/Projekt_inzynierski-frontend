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
	total_amount: number;
}

export interface Transaction {
	id: string;
	title: string;
	transaction_type: string;
	amount: number;
	description: string;
	created_at: string;
	updated_at: string;
	budget_id: string;
	category: {
		id: number;
		name: string;
		icon: string;
	};
}

export interface PaginatedList<T> {
	items: T[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

export interface PaginationRequestBody {
	page?: number;
	size?: number;
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
			providesTags: ['Budgets'],
		}),
		createBudget: builder.mutation<Budget, BudgetRequestBody>({
			query: (body) => ({
				url: '/budgets',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			}),
			invalidatesTags: ['Budgets'],
		}),
		retrieveBudget: builder.query<Budget, string>({
			query: (budgetId) => ({
				url: `/budgets/${budgetId}`,
				method: 'GET',
			}),
		}),
		retrieveTransactions: builder.query<
			PaginatedList<Transaction>,
			{ budgetId: string; size?: number; page?: number }
		>({
			query: ({ budgetId, size = 30, page = 1 }) => ({
				url: `/budgets/budgets/${budgetId}/transactions?size=${size}&page=${page}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useRetrieveBudgetsQuery,
	useCreateBudgetMutation,
	useRetrieveBudgetQuery,
	useRetrieveTransactionsQuery,
} = budgetApiSlice;
