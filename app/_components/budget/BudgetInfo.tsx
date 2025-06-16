'use client';

import { useRetrieveBudgetQuery } from '@/app/_redux/features/budgetApiSlice';
import Spinner from '../Spinner';
import Button from '../Button';
import TransactionsList from './TransactionsList';

interface BudgetInfoProps {
	budgetId: string;
}

export default function BudgetInfo({ budgetId }: BudgetInfoProps) {
	const { data: budget, isLoading } = useRetrieveBudgetQuery(budgetId);

	if (isLoading) {
		return (
			<div className='py-10'>
				<Spinner
					size='medium'
					color='text-main'
					description='Ładowanie informacji o budżecie...'
				/>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-row justify-between items-center pb-5'>
				<div className='flex flex-row gap-5 items-center'>
					<p
						className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-2xl aspect-square text-white rounded-full`}
						style={{ backgroundColor: budget?.color }}
					>
						{budget?.title.trimStart().charAt(0).toUpperCase()}
					</p>
					<p className='text-xl md:text-3xl'>{budget?.title}</p>
				</div>
				<div className='flex flex-row gap-3'>
					<Button size='small' color='light'>
						Zarządzaj budżetem
					</Button>
					<Button size='small'>Dodaj transakcję</Button>
				</div>
			</div>
			<div className='rounded-lg border border-grayThird bg-white p-3 px-5'>
				<p className='text-xl font-medium mb-2'>Opis</p>
				<p> {budget?.description}</p>
			</div>
			<div className='flex flex-row justify-between gap-3'>
				<div className='min-w-[250px] rounded-lg border border-grayThird bg-white p-3 px-5 h-fit'>
					<p className='text-xl font-medium mb-2'>Balans</p>
					<p className='text-2xl'>{budget?.total_amount.toFixed(2)} PLN</p>
				</div>
				<div className='rounded-lg border border-grayThird bg-white  p-3 px-5 grow '>
					<TransactionsList budgetId={budgetId} />
				</div>
			</div>
		</div>
	);
}
