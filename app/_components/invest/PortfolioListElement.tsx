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
	function getPolishNounForm(count: number): string {
		const lastDigit = count % 10;
		const lastTwoDigits = count % 100;

		if (count === 1) return 'Aktywo';
		if (
			lastDigit >= 2 &&
			lastDigit <= 4 &&
			(lastTwoDigits < 10 || lastTwoDigits > 20)
		) {
			return 'Aktywa';
		}
		return 'Aktyw';
	}

	return (
		<Link
			className='min-h-[90px] sm:min-w-fit flex flex-row justify-between gap-3 px-3 py-2 sm:px-5 sm:py-6 lg:px-8 lg:py-8 border border-grayThird shadow-md bg-white hover:bg-graySecond rounded-lg transition-colors duration-300'
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
					<span className='text-blackOne/70 text-sm mb-1'>
						{portfolio?.total_watched_cryptos}{' '}
						{getPolishNounForm(portfolio?.total_watched_cryptos || 0)}
					</span>
				</p>
			</div>
			<div className='flex flex-col justify-center items-end p-2 gap-1 text-sm md:text-base'>
				<p className='hidden sm:inline text-nowrap md:text-2xl'>
					{formatFullPrice(0)}
				</p>
				<p className='sm:hidden text-nowrap'>{formatShortPrice(0)}</p>
				<PercentageChange change={portfolio?.profit_loss_percentage} />
			</div>
		</Link>
	);
}
