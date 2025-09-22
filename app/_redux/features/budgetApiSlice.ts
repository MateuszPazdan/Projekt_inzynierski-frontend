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

export interface TransactionRequestBody {
	title: string;
	transaction_type: '+' | '-';
	amount: number;
	description: string;
	category_id: number;
	transaction_date: string;
}

export interface Transaction {
	title: string;
	transaction_type: string;
	amount: number;
	description: string;
	id: string;
	created_at: string;
	updated_at: string;
	budget_id: string;
	category: {
		id: number;
		name: string;
		icon: string;
	};
	transaction_date: string;
}

export interface TransactionCategory {
	id: number;
	name: string;
	icon: string;
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
		modifyBudget: builder.mutation<
			Budget,
			{ budgetId: string; budget: BudgetRequestBody }
		>({
			query: ({ budgetId, budget }) => ({
				url: `/budgets/${budgetId}`,
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: budget,
			}),
			invalidatesTags: (result, error, { budgetId }) => [
				{ type: 'Budget', id: budgetId },
				{ type: 'Budgets' },
			],
		}),
		deleteBudget: builder.mutation<void, Budget>({
			query: (budget) => ({
				url: `/budgets/${budget.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Budgets'],
		}),
		retrieveBudget: builder.query<Budget, string>({
			query: (budgetId) => ({
				url: `/budgets/${budgetId}`,
				method: 'GET',
			}),
			providesTags: (result, error, budgetId) => [
				{ type: 'Budget', id: budgetId },
			],
		}),

		retrieveTransactionCategories: builder.query<
			PaginatedList<TransactionCategory>,
			{ size?: number; page?: number }
		>({
			query: ({ size = 100, page = 1 }) => ({
				url: `/budgets/categories?size=${size}&page=${page}`,
				method: 'GET',
			}),
		}),
		createTransaction: builder.mutation<
			Transaction,
			{ budgetId: string; transaction: TransactionRequestBody }
		>({
			query: ({ budgetId, transaction }) => ({
				url: `/budgets/${budgetId}/transactions`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: transaction,
			}),
			invalidatesTags: (result, error, { budgetId }) => [
				{ type: 'Transactions', id: budgetId },
				{ type: 'Budget', id: budgetId },
				{ type: 'Budgets' },
			],
		}),
		modifyTransaction: builder.mutation<
			Transaction,
			{
				budgetId: string;
				transactionId: string;
				transaction: TransactionRequestBody;
			}
		>({
			query: ({ budgetId, transactionId, transaction }) => ({
				url: `/budgets/${budgetId}/transactions/${transactionId}`,
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: transaction,
			}),
			invalidatesTags: (result, error, { budgetId }) => [
				{ type: 'Transactions', id: budgetId },
				{ type: 'Budget', id: budgetId },
				{ type: 'Budgets' },
			],
		}),
		deleteTransaction: builder.mutation<void, Transaction>({
			query: (transaction) => ({
				url: `/budgets/${transaction.budget_id}/transactions/${transaction.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, transaction) => [
				{ type: 'Transactions', id: transaction.budget_id },
				{ type: 'Budget', id: transaction.budget_id },
				{ type: 'Budgets' },
			],
		}),
		deleteAllTransactions: builder.mutation<void, Budget>({
			query: (budget) => ({
				url: `/budgets/${budget.id}/transactions`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, budget) => [
				{ type: 'Transactions', id: budget.id },
				{ type: 'Budget', id: budget.id },
				{ type: 'Budgets' },
			],
		}),

		retrieveTransactions: builder.query<
			PaginatedList<Transaction>,
			{ budgetId: string; size?: number; page?: number }
		>({
			query: ({ budgetId, size = 30, page = 1 }) => ({
				url: `/budgets/${budgetId}/transactions?size=${size}&page=${page}`,
				method: 'GET',
			}),
			providesTags: (result, error, { budgetId }) => [
				{ type: 'Transactions', id: budgetId },
			],
		}),
	}),
});

export const {
	useRetrieveBudgetsQuery,
	useCreateBudgetMutation,
	useModifyBudgetMutation,
	useDeleteBudgetMutation,
	useRetrieveBudgetQuery,
	useRetrieveTransactionCategoriesQuery,
	useCreateTransactionMutation,
	useModifyTransactionMutation,
	useDeleteTransactionMutation,
	useDeleteAllTransactionsMutation,
	useRetrieveTransactionsQuery,
} = budgetApiSlice;
