'use client';

import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { thStyles } from './PortfolioWatchedList';
import { WatchedCrypto } from '@/app/_redux/features/portfiolioApiSlice';
import PercentageChange from '../market/PercentageChange';

interface PortfolioWatchedListElementProps {
	watchedElement?: WatchedCrypto;
}

export default function PortfolioWatchedListElement({
	watchedElement,
}: PortfolioWatchedListElementProps) {
	const router = useRouter();
	const params = useParams();
	const portfolioId = params.portfolioId;

	return (
		<tr
			onClick={() =>
				router.push(`${portfolioId}/${watchedElement?.crypto.symbol}`)
			}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} `}>
				<Link
					onClick={(e) => e.stopPropagation()}
					href={`/market/crypto/${watchedElement?.crypto?.symbol}`}
					className='flex flex-row items-center gap-2'
				>
					<Image
						alt='crypto-logo'
						src={`${watchedElement?.crypto.icon}`}
						width={24}
						height={24}
					/>
					<p className='flex flex-col items-start text-left'>
						<span>{watchedElement?.crypto?.symbol.toUpperCase()}</span>
						<span className='text-sm text-gray-700'>
							{watchedElement?.crypto.name}
						</span>
					</p>
				</Link>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				<span className='flex flex-col items-end text-right'>
					{formatFullPrice(watchedElement?.crypto.price)}
					<PercentageChange
						change={watchedElement?.crypto.price_change_percentage_24h}
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
						{watchedElement?.holdings}{' '}
						{watchedElement?.crypto.symbol.toUpperCase()}
					</span>
				</span>
			</td>
		</tr>
	);
}
