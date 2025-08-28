import { Budget } from '@/app/_redux/features/budgetApiSlice';
import { formatShortPrice } from '@/app/_utils/formatAmountOfMoney';
import Link from 'next/link';

interface BudgetElementProps {
	budget: Budget;
}

export default function BudgetElement({ budget }: BudgetElementProps) {
	return (
		<Link
			className='min-h-[110px] flex flex-col md:flex-row justify-center sm:justify-between gap-2 items-center px-3 py-2 sm:px-5 sm:py-6 lg:px-8  lg:py-8 border border-grayThird shadow-md bg-white hover:bg-graySecond rounded-lg transition-colors duration-300'
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
					<p className='text-blackOne/70 line-clamp-2 sm600:line-clamp-1 text-sm mb-1'>
						{budget?.description}
					</p>
					<p className='text-md text-nowrap md:hidden'>
						{formatShortPrice(budget?.total_amount)} zł
					</p>
				</div>
			</div>
			<p className='hidden md:inline text-2xl text-nowrap'>
				{formatShortPrice(budget?.total_amount)} zł
			</p>
		</Link>
	);
}
