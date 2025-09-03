import { PortfolioInfo } from '@/app/_redux/features/portfiolioApiSlice';
import Link from 'next/link';
import PercentageChange from '../market/PercentageChange';
import {
	formatFullPrice,
	formatShortPrice,
} from '@/app/_utils/formatAmountOfMoney';

interface PortfolioListElementProps {
	portfolio: PortfolioInfo;
}

export default function PortfolioListElement({
	portfolio,
}: PortfolioListElementProps) {
	return (
		<Link
			className='min-w-[90px] sm:min-w-fit flex flex-row justify-between gap-3 px-3 py-2 sm:px-5 sm:py-6 lg:px-8 lg:py-8 border border-grayThird shadow-md bg-white hover:bg-graySecond rounded-lg transition-colors duration-300'
			href={`/app/invest/crypto/${portfolio?.id}`}
		>
			<div className='flex flex-row gap-2 md:gap-3 items-center'>
				<span
					className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-xl aspect-square text-white rounded-full`}
					style={{ backgroundColor: portfolio?.color }}
				>
					{portfolio?.title.trimStart().charAt(0).toUpperCase()}
				</span>
				<p className='flex flex-col'>
					<span className='text-lg md:text-2xl line-clamp-1'>
						{portfolio?.title}
					</span>
					<span className='text-blackOne/70 text-sm mb-1'>3 Aktywa</span>
				</p>
			</div>
			<div className='flex flex-col justify-center items-end p-2 text-sm md:text-base'>
				<p className='hidden sm:inline text-nowrap md:text-2xl'>
					{formatFullPrice(250000000)}
				</p>
				<p className='sm:hidden text-nowrap'>{formatShortPrice(250000000)}</p>
				<PercentageChange change={15} />
			</div>
		</Link>
	);
}
