'use client';

import { useRetrieveBudgetQuery } from '@/app/_redux/features/budgetApiSlice';
import Spinner from '../Spinner';
import Button from '../Button';
import TransactionsList from './TransactionsList';
import Modal from '../Modal';
import ManageBudgetModal from './ManageBudgetModal';
import ManageTransactionModal from './ManageTransactionModal';

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
					<Modal>
						<Modal.Open opens='modifyBudget'>
							<Button size='small' color='light'>
								<span className='md:hidden'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										viewBox='0 0 16 16'
									>
										<path
											fillRule='evenodd'
											d='M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5'
										/>
									</svg>
								</span>
								<span className='hidden md:inline'>Zarządzaj budżetem</span>
							</Button>
						</Modal.Open>
						<Modal.Window name='modifyBudget'>
							<ManageBudgetModal
								onCloseModal={() => undefined}
								budget={budget}
							/>
						</Modal.Window>
					</Modal>

					<Modal>
						<Modal.Open opens='addTransaction'>
							<Button size='small' stretch>
								Dodaj transakcję
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
			<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
				<p className='text-xl font-medium mb-2'>Opis</p>
				<p> {budget?.description}</p>
			</div>
			<div className='flex flex-col md:flex-row justify-between gap-3'>
				<div className='min-w-[250px] rounded-lg border shadow-md border-grayThird bg-white p-3 px-5 h-fit'>
					<p className='text-xl font-medium mb-2'>Balans</p>
					<p className='text-2xl'>{budget?.total_amount.toFixed(2)} PLN</p>
				</div>
				<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 grow '>
					<TransactionsList budgetId={budgetId} />
				</div>
			</div>
		</div>
	);
}
