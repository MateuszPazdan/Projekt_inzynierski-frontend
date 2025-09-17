'use client';

import { Transaction } from '@/app/_redux/features/budgetApiSlice';
import { thStyles } from '../SortableTh';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';

interface BudgetTransactionElementProps {
	transaction: Transaction;
	onClick?: () => void;
}

export default function BudgetTransactionElement({
	transaction,
	onClick,
}: BudgetTransactionElementProps) {
	return (
		<tr
			onClick={onClick}
			key={transaction.id}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} text-left`}>
				<span className='flex flex-col justify-center items-start min-h-[40px] '>
					<span className='line-clamp-1 text-base'>{transaction?.title}</span>
					<span className='text-gray-600 text-xs line-clamp-1'>
						{transaction?.description}
					</span>
				</span>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				{transaction?.category.name}
			</td>
			<td
				className={`${thStyles} ${
					transaction?.transaction_type === '-'
						? 'text-red-500'
						: ' text-green-500'
				}`}
			>
				{transaction?.transaction_type === '-' && '-'}
				{formatFullPrice(transaction.amount)}
			</td>
		</tr>
	);
}
