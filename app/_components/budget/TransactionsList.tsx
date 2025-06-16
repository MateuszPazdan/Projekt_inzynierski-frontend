import {
	Transaction,
	useRetrieveTransactionsQuery,
} from '@/app/_redux/features/budgetApiSlice';

interface TransactionListProps {
	budgetId: string;
}

export default function TransactionsList({ budgetId }: TransactionListProps) {
	const { data: transactions, isLoading } = useRetrieveTransactionsQuery({
		budgetId,
	});

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className=''>
			<p className='text-xl font-medium mb-1'>Lista Transakcji</p>

			<table className='w-full text-[0.9rem]'>
				<thead className='text-left '>
					<tr className='border-b'>
						<th className='py-2'>Data</th>
						<th className='py-2'>Tytuł</th>
						<th className='py-2'>Kategoria</th>
						<th className='py-2 text-right'>Kwota</th>
					</tr>
				</thead>
				<tbody>
					{transactions?.items?.map((transaction: Transaction) => (
						<tr
							key={transaction.id}
							className='border-b last:border-0 hover:bg-grayThird transition'
						>
							<td className='py-2'>
								{new Date(transaction.created_at).toLocaleDateString()}
							</td>
							<td className='py-2'>{transaction.title}</td>
							<td className='flex items-center gap-2 py-2'>
								{transaction.category.name}
							</td>

							<td className='py-2 text-right'>
								{transaction.amount.toFixed(2)} PLN
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
