'use client';

import { useRetrieveBudgetsQuery } from '@/app/_redux/features/budgetApiSlice';
import BudgetElement from '../../_components/budget/BudgetElement';
import EmptyList from '../EmptyList';
import SearchParamsPagination from '../SearchParamsPagination';
import { useSearchParams } from 'next/navigation';
import BudgetElementSkeleton from './BudgetElementSkeleton';

export default function BudgetList() {
	const searchParams = useSearchParams();
	const currPage = Number(searchParams.get('page')) || 1;
	const {
		data,
		isLoading: isBudgetsLoading,
		isFetching: isBudgetFetching,
	} = useRetrieveBudgetsQuery({
		size: 10,
		page: currPage,
	});
	const budgets = data?.items;

	return (
		<div className='grid grid-cols-1 gap-2 sm:gap-5 items-stretch'>
			{isBudgetsLoading || isBudgetFetching ? (
				Array.from({ length: 5 }).map((_, i) => (
					<BudgetElementSkeleton key={i} />
				))
			) : budgets && budgets?.length > 0 ? (
				<>
					{budgets?.map((budget) => (
						<BudgetElement key={budget.id} budget={budget} />
					))}
					<SearchParamsPagination currPage={currPage} pages={data?.pages} />
				</>
			) : (
				<EmptyList
					description='Dodaj nowe budżety, aby je tutaj zobaczyć.'
					title='Nie odnaleziono żadnych budżetów.'
				/>
			)}
		</div>
	);
}
