'use client';

import {
	Transaction,
	useRetrieveTransactionsQuery,
} from '@/app/_redux/features/budgetApiSlice';
import EmptyList from '../EmptyList';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import { useState } from 'react';
import TransactionElement from './TransactionElement';

interface TransactionListProps {
	budgetId: string;
}

export default function TransactionsList({ budgetId }: TransactionListProps) {
	const [currPage, setCurrPage] = useState(1);
	const { data: transactions, isLoading } = useRetrieveTransactionsQuery({
		budgetId,
		size: 30,
		page: currPage,
	});

	function formatDateLabel(dateString: string): string {
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		const givenDate = new Date(dateString);
		const isToday = givenDate.toDateString() === today.toDateString();
		const isYesterday = givenDate.toDateString() === yesterday.toDateString();

		if (isToday) return 'Dzisiaj';
		if (isYesterday) return 'Wczoraj';

		return givenDate.toLocaleDateString('pl-PL', {
			weekday: 'long',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	}

	const groupedTransactions = transactions?.items?.reduce((acc, tx) => {
		const date = tx.created_at.split('T')[0];
		if (!acc[date]) acc[date] = [];
		acc[date].push(tx);
		return acc;
	}, {} as Record<string, Transaction[]>);

	const sortedDates = Object.keys(groupedTransactions || {})
		.sort()
		.reverse();

	if (isLoading) {
		return (
			<div className='py-5'>
				<Spinner size='small' description='ładowanie transakcji...' />
			</div>
		);
	}

	return (
		<div className='pb-2'>
			<p className='text-xl font-medium mb-3 px-2'>Historia transakcji</p>

			{transactions?.items.length === 0 ? (
				<EmptyList
					description='Dodaj nowe transakcje do budżetu, aby zobaczyć je tutaj.'
					title='Brak transakcji'
				/>
			) : (
				<>
					<div className='space-y-4 text-[0.9rem] px-2'>
						<div className='hidden md:grid grid-cols-[3fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr_auto] font-medium text-gray-600 border-b border-grayThird pb-2 px-5 gap-3'>
							<span>Tytuł</span>
							<span>Kategoria</span>
							<span className='text-right'>Kwota</span>
							<span className='min-w-8'></span>
						</div>

						{sortedDates.map((date) => (
							<div key={date}>
								<p className='text-sm font-semibold mb-1 capitalize'>
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
					</div>

					<Pagination
						currPage={currPage}
						pages={transactions?.pages || 1}
						setCurrPage={setCurrPage}
						size='sm'
					/>
				</>
			)}
		</div>
	);
}
