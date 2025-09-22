'use client';

import {
	Transaction,
	useRetrieveTransactionsQuery,
} from '@/app/_redux/features/budgetApiSlice';
import { formatDateLabel } from '@/app/_utils/formatDate';
import { useState } from 'react';
import InfoCard from '../InfoCard';
import Modal from '../Modal';
import Pagination from '../Pagination';
import BudgetTransactionElement from './BudgetTransactionElement';
import BudgetTransactionListHeader from './BudgetTransactionListHeader';
import BudgetTransactionDetailsModal from './BudgetTransactionDetailsModal';
import BudgetTransactionListSkeleton from './BudgetTransactionListSkeleton';
import EmptyList from '../EmptyList';

interface BudgetTransactionListProps {
	budgetId: string;
}

export default function BudgetTransactionList({
	budgetId,
}: BudgetTransactionListProps) {
	const [currPage, setCurrPage] = useState(1);
	const { data: transactions, isLoading: isTransactionListLoading } =
		useRetrieveTransactionsQuery({
			budgetId,
			size: 20,
			page: currPage,
		});

	const groupedTransactions = transactions?.items?.reduce((acc, tx) => {
		const date = tx.transaction_date.split('T')[0];
		if (!acc[date]) acc[date] = [];
		acc[date].push(tx);
		return acc;
	}, {} as Record<string, Transaction[]>);

	const sortedDates = Object.keys(groupedTransactions || {})
		.sort()
		.reverse();

	if (isTransactionListLoading) return <BudgetTransactionListSkeleton />;

	if (transactions?.items.length === 0 && !isTransactionListLoading)
		return (
			<InfoCard title='Lista transakcji'>
				<EmptyList
					description='Dodaj nowe transakcje do budżetu, aby je tutaj zobaczyć.'
					title='Brak transakcji'
				/>
			</InfoCard>
		);
	return (
		<InfoCard title='Lista transakcji'>
			<div className='overflow-x-auto'>
				<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
					<BudgetTransactionListHeader />
					<tbody className='divide-y divide-grayThird'>
						{sortedDates.flatMap((date) => [
							<tr key={`header-${date}`}>
								<td colSpan={7} className='px-3 py-2 text-left bg-grayOne'>
									<p className='text-sm font-medium text-gray-600 capitalize'>
										{formatDateLabel(date)}
									</p>
								</td>
							</tr>,
							...(groupedTransactions?.[date].map((transaction) => (
								<Modal key={transaction.id}>
									<Modal.Open opens='showPortfolioTransactionDetails'>
										<BudgetTransactionElement
											transaction={transaction}
											key={transaction.id}
										/>
									</Modal.Open>
									<Modal.Window name='showPortfolioTransactionDetails'>
										<BudgetTransactionDetailsModal
											onCloseModal={() => undefined}
											transaction={transaction}
										/>
									</Modal.Window>
								</Modal>
							)) || []),
						])}
					</tbody>
				</table>
			</div>
			<Pagination
				currPage={currPage}
				pages={transactions?.pages || 1}
				setCurrPage={setCurrPage}
				size='sm'
			/>
		</InfoCard>
	);
}
