export default function PortfolioListElementSkeleton() {
	return (
		<div className='min-h-[90px] sm:min-w-fit flex flex-row justify-between gap-3 px-3 py-2 sm:px-5 sm:py-6 lg:px-8 lg:py-8 border border-grayThird shadow-md bg-white rounded-lg'>
			<div className='flex flex-row gap-2 md:gap-3 items-center'>
				<div className='w-12 h-12 md:w-14 md:h-14 rounded-full shimmer' />

				<div className='flex flex-col gap-2 flex-1'>
					<div className='h-7 md:h-8 w-24 sm500:w-36 md:w-48 rounded shimmer' />
					<div className='h-5 w-16 rounded shimmer' />
				</div>
			</div>

			<div className='flex flex-col justify-center items-end p-2 gap-1'>
				<div className='h-5 md:h-8 w-20 md:w-32 rounded shimmer' />
				<div className='h-5 md:h-6 w-12 rounded shimmer' />
			</div>
		</div>
	);
}
