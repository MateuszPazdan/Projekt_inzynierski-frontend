'use client';

import {
	Transaction,
	useRetrieveTransactionsQuery,
} from '@/app/_redux/features/budgetApiSlice';
import EmptyList from '../EmptyList';
import Pagination from '../Pagination';
import { useState } from 'react';
import TransactionElement from './TransactionElement';
import TransactionElementSkeleton from './TransactionElementSkeleton';
import { formatDateLabel } from '@/app/_utils/formatDate';

interface TransactionListProps {
	budgetId: string;
}

export default function TransactionsList({ budgetId }: TransactionListProps) {
	const [currPage, setCurrPage] = useState(1);
	const { data: transactions, isLoading: isTransactionListLoading } =
		useRetrieveTransactionsQuery({
			budgetId,
			size: 30,
			page: currPage,
		});

	const groupedTransactions = transactions?.items?.reduce((acc, tx) => {
		const date = tx.created_at.split('T')[0];
		if (!acc[date]) acc[date] = [];
		acc[date].push(tx);
		return acc;
	}, {} as Record<string, Transaction[]>);

	const sortedDates = Object.keys(groupedTransactions || {})
		.sort()
		.reverse();

	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4  grow'>
			<p className='text-gray-600 font-medium pb-5'>Historia transakcji</p>

			<div className='grid grid-cols-[3fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr_auto] font-medium text-black border-b border-grayThird pb-2 mb-4  px-2 md:px-5 gap-3'>
				<span>Tytuł</span>
				<span className='hidden md:inline'>Kategoria</span>
				<span className='text-right'>Kwota</span>
				<span className='min-w-8'></span>
			</div>

			{isTransactionListLoading ? (
				Array.from({ length: 10 }).map((_, i) => (
					<TransactionElementSkeleton key={i} />
				))
			) : transactions && transactions?.items.length > 0 ? (
				<>
					{sortedDates.map((date) => (
						<div key={date}>
							<p className='text-sm font-medium text-gray-600 capitalize'>
								{formatDateLabel(date)}
							</p>

							{groupedTransactions?.[date].map((transaction) => {
								return (
									<TransactionElement
										transaction={transaction}
										key={transaction.id}
									/>
								);
							})}
						</div>
					))}

					<Pagination
						currPage={currPage}
						pages={transactions?.pages || 1}
						setCurrPage={setCurrPage}
						size='sm'
					/>
				</>
			) : (
				<EmptyList
					description='Dodaj nowe transakcje do budżetu, aby je tutaj zobaczyć.'
					title='Brak transakcji'
				/>
			)}
		</div>
	);
}
