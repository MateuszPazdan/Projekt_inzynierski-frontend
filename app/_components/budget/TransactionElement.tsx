'use client';

import { Transaction } from '@/app/_redux/features/budgetApiSlice';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Button from '../Button';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from '../Modal';
import ManageTransactionModal from './ManageTransactionModal';
import DeleteTransactionModal from './DeleteTransactionModal';

interface TransactionElementProps {
	transaction: Transaction;
}

export default function TransactionElement({
	transaction,
}: TransactionElementProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={`border-b border-grayThird py-4 last:border-b-0 transition-all duration-500 px-2 md:px-5 ${
				isExpanded ? 'bg-grayOne ' : ''
			}`}
		>
			<div className='grid grid-cols-[3fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr_auto] items-center gap-3'>
				<span className='truncate overflow-hidden whitespace-nowrap'>
					{transaction.title}
				</span>

				<span className='hidden md:block truncate overflow-hidden whitespace-nowrap'>
					{transaction.category.name}
				</span>

				<span className='text-right whitespace-nowrap md:hidden'>
					{transaction.transaction_type === '-' && '-'}
					{transaction.amount.toFixed(2)} PLN
				</span>

				<span className='text-right whitespace-nowrap hidden md:block'>
					{transaction.transaction_type === '-' && '-'}
					{transaction.amount.toFixed(2)} PLN
				</span>

				<button
					onClick={() => setIsExpanded((prev) => !prev)}
					className='flex items-center justify-center p-2 bg-transparent hover:bg-graySecond transition-colors rounded-md min-w-8'
					aria-label='Rozwiń szczegóły'
				>
					<FaAngleDown
						className={`duration-300 transition-transform ${
							isExpanded ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</div>

			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='overflow-hidden'
					>
						<div className='mt-2 text-sm flex flex-col gap-2 py-2'>
							<p className='md:hidden py-2'>{transaction.category.name}</p>
							<p className='text-gray-700 py-2'>
								{transaction.description || 'Brak opisu'}
							</p>
							<div className='flex gap-3'>
								<Modal>
									<Modal.Open opens='editTransaction'>
										<Button color='light' size='xs' stretch>
											Edytuj
										</Button>
									</Modal.Open>
									<Modal.Window name='editTransaction'>
										<ManageTransactionModal
											onCloseModal={() => undefined}
											transaction={transaction}
											budgetId={transaction.budget_id}
										/>
									</Modal.Window>
								</Modal>

								<Modal>
									<Modal.Open opens='deleteTransaction'>
										<Button color='danger' size='xs' stretch>
											Usuń
										</Button>
									</Modal.Open>
									<Modal.Window name='deleteTransaction'>
										<DeleteTransactionModal
											transaction={transaction}
											onCloseModal={() => undefined}
										/>
									</Modal.Window>
								</Modal>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
