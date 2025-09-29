import AssetListHeader from './AssetListHeader';

export default function AssetListSkeleton() {
	return (
		<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
			<AssetListHeader />
			<tbody className='divide-y divide-grayThird'>
				{Array.from({ length: 30 }).map((_, i) => (
					<tr key={i}>
						<td className='px-2 py-3 '>
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
	);
}
