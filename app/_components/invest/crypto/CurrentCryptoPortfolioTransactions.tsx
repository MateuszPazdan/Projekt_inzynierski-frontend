'use client';

import {
	PortfolioCryptoTransaction,
	useRetrieveCryptoPortfolioTransactionsQuery,
} from '@/app/_redux/features/portfiolioApiSlice';
import { formatDateLabel } from '@/app/_utils/formatDate';
import { useState } from 'react';
import Pagination from '../../Pagination';
import EmptyList from '../../EmptyList';
import TransactionElement from '../../budget/TransactionElement';
import PortfolioTransactionElement from '../PortfolioTransactionElement';

interface CurrentCryptoPortfolioTransactionsProps {
	portfolioId: string;
	cryptoSymbol: string;
}

export default function CurrentCryptoPortfolioTransactions({
	portfolioId,
	cryptoSymbol,
}: CurrentCryptoPortfolioTransactionsProps) {
	const [currPage, setCurrPage] = useState(1);
	const { data: transactions, isLoading: isTransactionListLoading } =
		useRetrieveCryptoPortfolioTransactionsQuery({
			cryptoSymbol: cryptoSymbol,
			portfolioId: portfolioId,
		});

	const groupedTransactions = transactions?.items?.reduce((acc, tx) => {
		const date = tx.transaction_date.split('T')[0];
		if (!acc[date]) acc[date] = [];
		acc[date].push(tx);
		return acc;
	}, {} as Record<string, PortfolioCryptoTransaction[]>);

	const sortedDates = Object.keys(groupedTransactions || {})
		.sort()
		.reverse();

	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 overflow-x-auto '>
			<p className='text-gray-600 font-medium pb-5'>Historia transakcji</p>

			<div className='grid grid-cols-6 gap-3 font-medium text-black border-b border-grayThird pb-2 mb-4  px-2 md:px-5 '>
				<span>Rodzaj</span>
				<span className='text-left'>Kurs</span>
				<span className='text-right'>Wartość</span>
				<span className='text-right'>Ilość</span>
				<span className='text-right'>Całkowity zysk / strata</span>
				<span className='text-right'>Działania</span>
			</div>

			{isTransactionListLoading ? (
				Array.from({ length: 10 }).map((_, i) => (
					// <TransactionElementSkeleton key={i} />
					<div key={i}></div>
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
									<PortfolioTransactionElement
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
					description='Dodaj nowe transakcje do portfolio, aby je tutaj zobaczyć.'
					title='Brak transakcji'
				/>
			)}
		</div>
	);
}
