'use client';

import { useRetrieveBudgetQuery } from '@/app/_redux/features/budgetApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import Button from '../Button';
import InfoCard from '../InfoCard';
import Modal from '../Modal';
import BudgetTransactionList from './BudgetTransactionList';
import BudgetManageBtn from './BudgetManageBtn';
import BudgetManageTransactionModal from './BudgetManageTransactionModal';

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
					<BudgetManageBtn budget={budget} isLoading={isBudgetLoading} />

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
							<BudgetManageTransactionModal
								onCloseModal={() => undefined}
								budgetId={budgetId}
							/>
						</Modal.Window>
					</Modal>
				</div>
			</div>
			<InfoCard
				title='Opis'
				isLoading={isBudgetLoading}
				text={budget?.description || 'Brak opisu'}
			/>
			<InfoCard
				title='Balans'
				isLoading={isBudgetLoading}
				text={formatFullPrice(budget?.total_amount) || 'Brak opisu'}
			/>
			<BudgetTransactionList budgetId={budgetId} />
		</div>
	);
}
