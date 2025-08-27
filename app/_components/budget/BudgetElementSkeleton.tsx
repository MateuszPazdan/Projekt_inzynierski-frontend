'use client';

export default function BudgetElementSkeleton() {
	return (
		<div className='min-h-[110px] flex flex-col md:flex-row justify-center sm:justify-between gap-2 items-center px-3 py-2 sm:px-5 sm:py-6 lg:px-8 lg:py-8 border border-grayThird shadow-md bg-white rounded-lg'>
			<div className='flex flex-row gap-5 items-center w-full'>
				<div className='w-12 h-12 md:w-14 md:h-14 rounded-full shimmer' />

				<div className='flex flex-col gap-2 flex-1'>
					<div className='h-7 w-32 md:w-44 rounded shimmer' />
					<div className='h-5 w-48 md:w-60 rounded shimmer' />
					<div className='h-6 w-24 rounded shimmer md:hidden' />
				</div>
			</div>

			<div className='hidden md:block'>
				<div className='h-8 w-28 rounded shimmer' />
			</div>
		</div>
	);
}
