import { Budget } from '@/app/_redux/features/budgetApiSlice';
import {
	formatFullPrice,
	formatShortPrice,
} from '@/app/_utils/formatAmountOfMoney';
import Link from 'next/link';

interface BudgetElementProps {
	budget: Budget;
}

export default function BudgetElement({ budget }: BudgetElementProps) {
	return (
		<Link
			className='min-h-[90px] sm:min-w-fit flex flex-row justify-between gap-3 px-3 py-2 sm:px-5 sm:py-6 lg:px-8 lg:py-8 border border-grayThird shadow-md bg-white hover:bg-graySecond rounded-lg transition-colors duration-300'
			href={`budget/${budget?.id}`}
		>
			<div className='flex flex-row gap-2 md:gap-3 items-center'>
				<span
					className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-xl aspect-square text-white rounded-full`}
					style={{ backgroundColor: budget?.color }}
				>
					{budget?.title.trimStart().charAt(0).toUpperCase()}
				</span>
				<p className='flex flex-col'>
					<span className='text-lg md:text-2xl line-clamp-1'>
						{budget?.title}
					</span>
					<span className='text-blackOne/70 line-clamp-2 sm600:line-clamp-1 text-sm mb-1'>
						{budget?.description}
					</span>
				</p>
			</div>
			<div className='flex flex-col justify-center items-center p-2 text-sm md:text-base'>
				<span className='hidden sm:inline text-nowrap md:text-2xl'>
					{formatFullPrice(budget?.total_amount)}
				</span>
				<span className='inline sm:hidden text-nowrap'>
					{formatShortPrice(budget?.total_amount)}
				</span>
			</div>
		</Link>
	);
}
