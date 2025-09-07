export default function PortfolioWatchedListSkeleton() {
	return (
		<div className='overflow-x-auto rounded-lg border border-grayThird shadow-md bg-white p-3 px-4'>
			<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
				<thead>
					<tr>
						<th className='px-3 py-2 text-left'>Waluta</th>
						<th className='px-3 py-2'>Kurs</th>
						<th className='px-3 py-2'>Zysk / Strata (24h)</th>
						<th className='px-3 py-2'>Całkowity koszt</th>
						<th className='px-3 py-2'>Średni koszt</th>
						<th className='px-3 py-2'>Całkowity zysk / strata</th>
						<th className='px-3 py-2'>Zasoby</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-grayThird'>
					{Array.from({ length: 10 }).map((_, i) => (
						<tr key={i}>
							<td className='px-2 py-3 text-left'>
								<div className='h-4 w-20 rounded shimmer' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-12 rounded shimmer ml-auto' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-10 rounded shimmer ml-auto' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-10 rounded shimmer ml-auto' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-10 rounded shimmer ml-auto' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-10 rounded shimmer ml-auto' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-10 rounded shimmer ml-auto' />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
