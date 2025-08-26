'use client';

import { useRetrieveBudgetQuery } from '@/app/_redux/features/budgetApiSlice';
import Spinner from '../Spinner';
import Button from '../Button';
import TransactionsList from './TransactionsList';
import Modal from '../Modal';
import ManageTransactionModal from './ManageTransactionModal';
import { formatShortPrice } from '@/app/_utils/formatAmountOfMoney';
import ManageBudgetBtn from './ManageBudgetBtn';
import { notFound } from 'next/navigation';
import { BsPlus } from 'react-icons/bs';

interface BudgetInfoProps {
	budgetId: string;
}

export default function BudgetInfo({ budgetId }: BudgetInfoProps) {
	const { data: budget, isLoading } = useRetrieveBudgetQuery(budgetId);

	if (isLoading) {
		return (
			<div className='flex-1 py-10 flex justify-center items-center'>
				<Spinner
					size='medium'
					color='text-main'
					description='Ładowanie informacji o budżecie...'
				/>
			</div>
		);
	}

	if (!budget) notFound();

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-col md:flex-row justify-between gap-5 items-center pb-5'>
				<div className='flex md:flex-row flex-row-reverse justify-between gap-5 items-center w-full md:w-fit'>
					<p
						className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-2xl aspect-square text-white rounded-full`}
						style={{ backgroundColor: budget?.color }}
					>
						{budget?.title.trimStart().charAt(0).toUpperCase()}
					</p>
					<p className='text-2xl md:text-3xl'>{budget?.title}</p>
				</div>
				<div className='flex flex-row gap-3 w-full md:w-fit'>
					<ManageBudgetBtn budget={budget} />

					<Modal>
						<Modal.Open opens='addTransaction'>
							<Button size='small' stretch>
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
			<div className='grid grid-cols-1  md:grid-cols-[1fr_auto] gap-3'>
				<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
					<p className='text-xl font-medium mb-2'>Opis</p>
					<p>{budget?.description || 'Brak opisu'}</p>
				</div>
				<div className='min-w-[250px] md:w-fit rounded-lg border shadow-md border-grayThird bg-white p-3 px-5'>
					<p className='text-xl font-medium mb-2 '>Balans</p>
					<p className='text-xl md:text-2xl truncate overflow-hidden whitespace-nowrap'>
						{formatShortPrice(budget?.total_amount || 0)} PLN
					</p>
				</div>
			</div>
			<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 grow '>
				<TransactionsList budgetId={budgetId} />
			</div>
		</div>
	);
}
