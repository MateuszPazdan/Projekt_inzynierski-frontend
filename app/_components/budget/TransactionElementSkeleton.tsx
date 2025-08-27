export default function TransactionElementSkeleton() {
	return (
		<div className='border-b border-grayThird last:border-b-0 px-2 md:px-5 py-4'>
			<div className='grid grid-cols-[3fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr_auto] items-center gap-3'>
				<div className='h-4 w-28 md:w-40 rounded shimmer' />

				<div className='hidden md:block h-4 w-24 rounded shimmer' />

				<div className='md:hidden flex justify-end'>
					<div className='h-4 w-16 rounded shimmer' />
				</div>

				<div className='hidden md:flex justify-end'>
					<div className='h-4 w-20 rounded shimmer' />
				</div>

				<div className='flex justify-center'>
					<div className='h-6 w-6 rounded shimmer' />
				</div>
			</div>
		</div>
	);
}
