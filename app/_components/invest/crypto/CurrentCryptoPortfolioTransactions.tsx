'use client';

import {
	PortfolioCryptoTransaction,
	useRetrieveCryptoPortfolioTransactionsQuery,
} from '@/app/_redux/features/portfiolioApiSlice';
import { formatDateLabel } from '@/app/_utils/formatDate';
import { useState } from 'react';
import EmptyList from '../../EmptyList';
import InfoCard from '../../InfoCard';
import Modal from '../../Modal';
import Pagination from '../../Pagination';
import PortfolioTransactionListElement from '../PortfolioTransactionListElement';
import PortfolioTransactionListHeader from '../PortfolioTransactionListHeader';
import PortfolioTransactionListSkeleton from '../PortfolioTransactionListSkeleton';
import ManagePortfolioTransactionModal from '../ManangePortfolioTransactionModal';

export const thStyles = 'group px-3 py-2 ';
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
			size: 30,
			page: currPage,
		});

	const groupedTransactions = transactions?.items?.reduce(
		(acc, currTransaction) => {
			const date = currTransaction.transaction_date.split('T')[0];
			if (!acc[date]) acc[date] = [];
			acc[date].push(currTransaction);
			return acc;
		},
		{} as Record<string, PortfolioCryptoTransaction[]>
	);

	const sortedDates = Object.keys(groupedTransactions || {})
		.sort()
		.reverse();

	if (isTransactionListLoading) return <PortfolioTransactionListSkeleton />;

	if (transactions?.items.length === 0 && !isTransactionListLoading)
		return (
			<InfoCard title='Lista transakcji'>
				<EmptyList
					description='Dodaj nowe transakcje do portfolio, aby je tutaj zobaczyć.'
					title='Brak transakcji'
				/>
			</InfoCard>
		);

	return (
		<InfoCard title='Lista transakcji'>
			<div className='overflow-x-auto'>
				<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
					<PortfolioTransactionListHeader />
					<tbody className='divide-y divide-grayThird'>
						{sortedDates.flatMap((date) => [
							<tr key={`header-${date}`}>
								<td colSpan={7} className='px-3 py-2 text-left'>
									<p className='text-sm font-medium text-gray-600 capitalize'>
										{formatDateLabel(date)}
									</p>
								</td>
							</tr>,
							...(groupedTransactions?.[date].map((transaction) => (
								<Modal key={transaction.id}>
									<Modal.Open opens='manageTransaction'>
										<PortfolioTransactionListElement
											transaction={transaction}
										/>
									</Modal.Open>
									<Modal.Window name='manageTransaction'>
										<ManagePortfolioTransactionModal
											transaction={transaction}
											onCloseModal={() => undefined}
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
