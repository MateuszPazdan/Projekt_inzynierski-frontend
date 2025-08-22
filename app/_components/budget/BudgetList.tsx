'use client';

import { useRetrieveBudgetsQuery } from '@/app/_redux/features/budgetApiSlice';
import BudgetElement from '../../_components/budget/BudgetElement';
import Spinner from '../Spinner';
import EmptyList from '../EmptyList';
import Pagination from '../Pagination';
import { useState } from 'react';

export default function BudgetList() {
	const [currPage, setCurrPage] = useState(1);
	const {
		data,
		isLoading: isBudgetsLoading,
		isFetching: isBudgetFetching,
	} = useRetrieveBudgetsQuery({
		size: 30,
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
					<Pagination
						currPage={currPage}
						setCurrPage={setCurrPage}
						pages={data?.pages}
					/>
				</>
			) : (
				<EmptyList description='Nie odnaleziono żadnych budżetów.' />
			)}
		</div>
	);
}
