import {
	Transaction,
	useRetrieveTransactionsQuery,
} from '@/app/_redux/features/budgetApiSlice';
import EmptyList from '../EmptyList';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import { useState } from 'react';

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

	if (isLoading)
		return (
			<div className='py-5'>
				<Spinner size='small' description='ładowanie transakcji...' />
			</div>
		);

	return (
		<div className=''>
			<p className='text-xl font-medium mb-1'>Lista Transakcji</p>

			{transactions?.items.length === 0 ? (
				<EmptyList
					description='Dodaj nowe transakcje do budżetu, aby zobaczyć je tutaj.'
					title='Brak transakcji'
				/>
			) : (
				<>
					<table className='w-full text-[0.9rem] mb-4'>
						<thead className='text-left '>
							<tr className='border-b'>
								<th className='py-2'>Data</th>
								<th className='py-2'>Tytuł</th>
								<th className='py-2'>Kategoria</th>
								<th className='py-2 text-right'>Kwota</th>
							</tr>
						</thead>
						<tbody>
							{transactions?.items?.map((transaction: Transaction) => {
								// console.log(transaction.category.icon);
								return (
									<tr key={transaction.id} className='border-b last:border-0'>
										<td className='py-2'>
											{new Date(transaction.created_at).toLocaleDateString()}
										</td>
										<td className='py-2'>{transaction.title}</td>
										<td className='py-2'>{transaction.category.name}</td>

										<td className='py-2 text-right'>
											{transaction.transaction_type === '-' && '-'}
											{transaction.amount.toFixed(2)} PLN
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
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
