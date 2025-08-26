'use client';

import { useRetrieveBudgetsQuery } from '@/app/_redux/features/budgetApiSlice';
import BudgetElement from '../../_components/budget/BudgetElement';
import Spinner from '../Spinner';
import EmptyList from '../EmptyList';
import SearchParamsPagination from '../SearchParamsPagination';
import { useSearchParams } from 'next/navigation';

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

	if (isBudgetsLoading || isBudgetFetching) {
		return (
			<div className='py-10'>
				<Spinner
					size='large'
					description='Ładowanie budżetów...'
					color='text-main'
				/>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-2 sm:gap-5 items-stretch'>
			{budgets && budgets?.length > 0 ? (
				<>
					{budgets?.map((budget) => (
						<BudgetElement key={budget.id} budget={budget} />
					))}
					<SearchParamsPagination currPage={currPage} pages={data?.pages} />
				</>
			) : (
				<EmptyList description='Nie odnaleziono żadnych budżetów.' />
			)}
		</div>
	);
}
