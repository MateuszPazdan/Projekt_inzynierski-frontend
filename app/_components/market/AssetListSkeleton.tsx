export default function AssetListSkeleton() {
	return (
		<div className='overflow-x-auto rounded-lg border border-grayThird shadow-md bg-white p-3 px-4'>
			<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
				<thead>
					<tr>
						<th className='w-0'></th>
						<th className='px-2 py-2 text-center'>#</th>
						<th className='px-3 py-2 text-left'>Waluta</th>
						<th className='px-3 py-2'>Kurs</th>
						<th className='px-3 py-2'>1h</th>
						<th className='px-3 py-2'>24h</th>
						<th className='px-3 py-2'>7d</th>
						<th className='px-3 py-2'>Wolumen 24h</th>
						<th className='px-3 py-2'>Kapitalizacja</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-grayThird'>
					{Array.from({ length: 30 }).map((_, i) => (
						<tr key={i}>
							<td className='px-2 py-3'>
								<div className='h-4 w-4 rounded shimmer' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-6 rounded shimmer' />
							</td>
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
								<div className='h-4 w-20 rounded shimmer ml-auto' />
							</td>
							<td className='px-2 py-3'>
								<div className='h-4 w-24 rounded shimmer ml-auto' />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
