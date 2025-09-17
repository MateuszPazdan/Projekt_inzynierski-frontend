import { thStyles } from '../SortableTh';
import BudgetTransactionListHeader from './BudgetTransactionListHeader';

export default function BudgetTransactionListSkeleton() {
	return (
		<div className='overflow-x-auto rounded-lg border border-grayThird shadow-md bg-white p-3 px-4'>
			<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
				<BudgetTransactionListHeader />
				<tbody className='divide-y divide-grayThird'>
					{Array.from({ length: 10 }).map((_, i) => (
						<tr key={i}>
							<td className={`${thStyles} text-left`}>
								<span className='flex flex-col items-start gap-1'>
									<div className='h-5 w-[160px] shimmer rounded' />
									<div className='h-4 w-[240px] shimmer rounded' />
								</span>
							</td>
							<td className={thStyles}>
								<div className='h-6 w-[150px] shimmer rounded ml-auto' />
							</td>
							<td className={thStyles}>
								<div className='h-6 w-[100px] shimmer rounded ml-auto' />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
