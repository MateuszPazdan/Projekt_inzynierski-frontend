'use client';

import { PiStar } from 'react-icons/pi';
import { thStyles } from './StockList';
import { useRouter } from 'next/navigation';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { formatFullAmount } from '@/app/_utils/formatAmountOfMoney';
import { Stock } from '@/app/_redux/features/marketApiSlice';

interface StockListElementProps {
	stock: Stock;
}

export default function StockListElement({ stock }: StockListElementProps) {
	const router = useRouter();

	function handleNavigate() {
		router.push(`/market/stocks/${stock.symbol}`);
	}

	function hadnleClick(e: React.MouseEvent) {
		e.stopPropagation();
		console.log('favorite clicked');
	}

	return (
		<tr
			onClick={() => handleNavigate()}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} `}>
				<button
					onClick={hadnleClick}
					className='text-xl p-2 hover:bg-graySecond transition-colors duration-300  rounded-lg'
				>
					<PiStar />
				</button>
			</td>
			<td className={`${thStyles} text-center`}>{stock.market_cap_rank}</td>
			<td className={`${thStyles} flex flex-col items-start`}>
				<span>{stock.name}</span>
				<span className='text-sm text-gray-700'>{stock.symbol}</span>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				{stock.price.toFixed(2)} PLN
			</td>
			<td className={`${thStyles}`}>
				<span
					className={`flex items-center justify-end ${
						stock.price_change_percentage_1h > 0 && ' text-green-500 '
					} ${stock.price_change_percentage_1h < 0 && ' text-red-500 '}`}
				>
					{stock.price_change_percentage_1h > 0 && (
						<span>
							<BsArrowUpShort />
						</span>
					)}
					{stock.price_change_percentage_1h < 0 && (
						<span>
							<BsArrowDownShort />
						</span>
					)}
					{stock.price_change_percentage_1h ?? '-'}%
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span
					className={`flex items-center justify-end ${
						stock.price_change_percentage_24h > 0 && ' text-green-500 '
					} ${stock.price_change_percentage_24h < 0 && ' text-red-500 '}`}
				>
					{stock.price_change_percentage_24h > 0 && (
						<span>
							<BsArrowUpShort />
						</span>
					)}
					{stock.price_change_percentage_24h < 0 && (
						<span>
							<BsArrowDownShort />
						</span>
					)}
					{stock.price_change_percentage_24h ?? '-'}%
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span
					className={`flex items-center justify-end ${
						stock.price_change_percentage_7d > 0 && ' text-green-500 '
					} ${stock.price_change_percentage_7d < 0 && ' text-red-500 '}`}
				>
					{stock.price_change_percentage_7d > 0 && (
						<span>
							<BsArrowUpShort />
						</span>
					)}
					{stock.price_change_percentage_7d < 0 && (
						<span>
							<BsArrowDownShort />
						</span>
					)}
					{stock.price_change_percentage_7d}%
				</span>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				{formatFullAmount(Number(stock.volume_24h * stock.price))}{' '}
				{stock.currency}
			</td>
			<td className={`${thStyles} pr-2 md:pr-3 text-nowrap`}>
				{formatFullAmount(stock.market_cap)} {stock.currency}
			</td>
		</tr>
	);
}
