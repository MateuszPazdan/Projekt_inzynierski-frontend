'use client';

import { WatchedStocks } from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import PercentageChange from '../../market/PercentageChange';
import { thStyles } from '../../SortableTh';

interface PortfolioWatchedStockListElementProps {
	watchedElement?: WatchedStocks;
}

export default function PortfolioWatchedStockListElement({
	watchedElement,
}: PortfolioWatchedStockListElementProps) {
	const router = useRouter();
	const params = useParams();
	const portfolioId = params.portfolioId;

	return (
		<tr
			onClick={() =>
				router.push(`${portfolioId}/${watchedElement?.stock.symbol}`)
			}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} `}>
				<Link
					onClick={(e) => e.stopPropagation()}
					href={`/market/stocks/${watchedElement?.stock?.symbol}`}
					className='flex flex-row items-center gap-2'
				>
					<p
						className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
					>
						{watchedElement?.stock.name.trimStart().charAt(0).toUpperCase()}
					</p>
					<p className='flex flex-col items-start text-left'>
						<span>{watchedElement?.stock?.symbol.toUpperCase()}</span>
						<span className='text-sm text-gray-700'>
							{watchedElement?.stock.name}
						</span>
					</p>
				</Link>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				<span className='flex flex-col items-end text-right'>
					{formatFullPrice(watchedElement?.stock.price)}
					<PercentageChange
						change={watchedElement?.stock.price_change_percentage_24h}
					/>
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span
					className={`flex items-center justify-end ${
						watchedElement &&
						(watchedElement?.profit_loss_24h > 0
							? 'text-green-500'
							: watchedElement.profit_loss_24h < 0
							? 'text-red-500'
							: '')
					}`}
				>
					{formatFullPrice(watchedElement?.profit_loss_24h)}
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{formatFullPrice(watchedElement?.total_invested)}
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{formatFullPrice(watchedElement?.avg_buy_price)}
				</span>
			</td>
			<td
				className={`${thStyles} text-nowrap ${
					watchedElement &&
					(watchedElement?.profit_loss > 0
						? 'text-green-500'
						: watchedElement?.profit_loss < 0
						? 'text-red-500'
						: '')
				}`}
			>
				{formatFullPrice(watchedElement?.profit_loss)}
			</td>
			<td className={`${thStyles} text-nowrap`}>
				<span className='flex flex-col items-end'>
					<span>{formatFullPrice(watchedElement?.current_value)}</span>
					<span className='text-gray-600'>
						{formatFullPrice(watchedElement?.holdings, false)}{' '}
						{watchedElement?.stock.symbol.toUpperCase()}
					</span>
				</span>
			</td>
		</tr>
	);
}
