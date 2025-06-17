import { Budget } from '@/app/_redux/features/budgetApiSlice';
import Link from 'next/link';

interface BudgetElementProps {
	budget: Budget;
}

export default function BudgetElement({ budget }: BudgetElementProps) {
	return (
		<Link
			className='relative overflow-hidden flex flex-col md:flex-row justify-between gap-2 items-center px-2 sm:px-5 lg:px-10 py-4 sm:py-6 lg:py-10 border border-grayThird shadow-md bg-white hover:border-second hover:text-second rounded-lg transition-colors duration-300 cursor-pointer'
			href={`budget/${budget?.id}`}
		>
			<div className='flex flex-row gap-5 items-center w-full'>
				<p
					className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-xl aspect-square text-white rounded-full`}
					style={{ backgroundColor: budget?.color }}
				>
					{budget?.title.trimStart().charAt(0).toUpperCase()}
				</p>
				<div>
					<p className='text-xl md:text-2xl'>{budget?.title}</p>
					<p className='text-blackOne/70 line-clamp-2 sm600:line-clamp-1 text-sm'>
						{budget?.description}
					</p>
					<p className='text-lg text-nowrap md:hidden'>
						{budget?.total_amount.toFixed(2)} PLN
					</p>
				</div>
			</div>
			<p className='hidden md:inline text-2xl text-nowrap'>
				{budget?.total_amount.toFixed(2)} PLN
			</p>
		</Link>
	);
}
