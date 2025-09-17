'use client';

import { useRetrieveBudgetQuery } from '@/app/_redux/features/budgetApiSlice';
import Button from '../Button';
import TransactionsList from './TransactionsList';
import Modal from '../Modal';
import ManageTransactionModal from './ManageTransactionModal';
import { formatShortPrice } from '@/app/_utils/formatAmountOfMoney';
import ManageBudgetBtn from './ManageBudgetBtn';
import { notFound } from 'next/navigation';
import { BsPlus } from 'react-icons/bs';
import { useEffect } from 'react';

interface BudgetInfoProps {
	budgetId: string;
}

export default function BudgetInfo({ budgetId }: BudgetInfoProps) {
	const { data: budget, isLoading: isBudgetLoading } =
		useRetrieveBudgetQuery(budgetId);

	if (!budget && !isBudgetLoading) notFound();

	useEffect(() => {
		document.title = `${budget?.title || 'Przegląd budżetu'} | Asset Flow`;
	}, [budget]);

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-col md:flex-row justify-between gap-5 items-center pb-5'>
				<div className='flex md:flex-row flex-row-reverse justify-between gap-5 items-center w-full md:w-fit'>
					{!isBudgetLoading ? (
						<>
							<p
								className='flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-2xl aspect-square text-white rounded-full'
								style={{ backgroundColor: budget?.color }}
							>
								{budget?.title.trimStart().charAt(0).toUpperCase()}
							</p>
							<p className='text-2xl md:text-3xl'>{budget?.title}</p>
						</>
					) : (
						<>
							<div className='h-12 w-12 md:w-14 md:h-14 rounded-full shimmer' />
							<div className='h-9 w-32 sm:w-44 rounded shimmer' />
						</>
					)}
				</div>
				<div className='flex flex-row gap-3 w-full md:w-fit'>
					<ManageBudgetBtn budget={budget} isLoading={isBudgetLoading} />

					<Modal>
						<Modal.Open opens='addTransaction'>
							<Button size='small' stretch disabled={isBudgetLoading}>
								<span className='text-3xl'>
									<BsPlus />
								</span>
								<span className='pr-3'>Dodaj transakcję</span>
							</Button>
						</Modal.Open>
						<Modal.Window name='addTransaction'>
							<ManageTransactionModal
								onCloseModal={() => undefined}
								budgetId={budgetId}
							/>
						</Modal.Window>
					</Modal>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3'>
				<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
					<p className='text-gray-600 font-medium'>Opis</p>
					{!isBudgetLoading ? (
						<p className='font-medium text-lg'>
							{budget?.description || 'Brak opisu'}
						</p>
					) : (
						<div className='h-[28px] w-2/3 sm:w-1/3 rounded shimmer' />
					)}
				</div>
				<div className='min-w-[250px] md:w-fit rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
					<p className='text-gray-600 font-medium'>Balans</p>
					{!isBudgetLoading ? (
						<p className='font-medium text-lg'>
							{formatShortPrice(budget?.total_amount || 0)} PLN
						</p>
					) : (
						<div className='h-[28px] w-2/3 sm:w-1/2 rounded shimmer' />
					)}
				</div>
			</div>

			<TransactionsList budgetId={budgetId} />
		</div>
	);
}
