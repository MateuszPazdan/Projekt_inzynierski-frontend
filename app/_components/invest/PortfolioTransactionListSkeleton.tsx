import { thStyles } from '../SortableTh';
import PortfolioTransactionListHeader from './PortfolioTransactionListHeader';

export default function PortfolioTransactionListSkeleton() {
	return (
		<div className='overflow-x-auto rounded-lg border border-grayThird shadow-md bg-white p-3 px-4'>
			<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
				<PortfolioTransactionListHeader />
				<tbody className='divide-y divide-grayThird'>
					{Array.from({ length: 10 }).map((_, i) => (
						<tr key={i}>
							<td className={`${thStyles} text-left`}>
								<span className='flex flex-row items-center gap-3'>
									<div className='w-6 h-6 rounded-full shimmer' />
									<span className='flex flex-col items-start gap-1'>
										<div className='h-5 w-16 shimmer rounded' />
										<div className='h-5 w-10 shimmer rounded' />
									</span>
								</span>
							</td>
							<td className={thStyles}>
								<div className='h-5 w-12 shimmer rounded ml-auto' />
							</td>
							<td className={thStyles}>
								<div className='h-5 w-16 shimmer rounded ml-auto' />
							</td>
							<td className={thStyles}>
								<div className='h-5 w-16 shimmer rounded ml-auto' />
							</td>
							<td className={thStyles}>
								<div className='flex flex-col items-end gap-1 ml-auto'>
									<div className='h-6 w-12 shimmer rounded' />
									<div className='h-5 w-8 shimmer rounded' />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
