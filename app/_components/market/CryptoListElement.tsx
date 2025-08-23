'use client';

import Image from 'next/image';
import { PiStar } from 'react-icons/pi';
import { thStyles } from './CryptoList';
import { useRouter } from 'next/navigation';
import { Crypto } from '@/app/_actions/cryptoActions';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { formatFullAmount } from '@/app/_utils/formatAmountOfMoney';

interface CryptoListElementProps {
	crypto: Crypto;
}

export default function CryptoListElement({ crypto }: CryptoListElementProps) {
	const router = useRouter();

	function handleNavigate() {
		router.push(`/market/crypto/${crypto.symbol}`);
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
			<td className={`${thStyles} text-center`}>{crypto.market_cap_rank}</td>
			<td className={`${thStyles} flex flex-row items-center gap-2`}>
				<Image
					alt='crypto-logo'
					src={`${crypto.icon}`}
					width={28}
					height={28}
				/>
				<p className='flex flex-col items-start text-left'>
					<span>{crypto.name}</span>
					<span className='text-sm text-gray-700'>{crypto.symbol}</span>
				</p>
			</td>
			<td className={`${thStyles} text-nowrap`}>{crypto.price.toFixed(2)} PLN</td>
			<td className={`${thStyles}`}>
				<span
					className={`flex items-center justify-end ${
						crypto.price_change_percentage_1h > 0 && ' text-green-500 '
					} ${crypto.price_change_percentage_1h < 0 && ' text-red-500 '}`}
				>
					{crypto.price_change_percentage_1h > 0 && (
						<span>
							<BsArrowUpShort />
						</span>
					)}
					{crypto.price_change_percentage_1h < 0 && (
						<span>
							<BsArrowDownShort />
						</span>
					)}
					{crypto.price_change_percentage_1h ?? '-'}%
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span
					className={`flex items-center justify-end ${
						crypto.price_change_percentage_24h > 0 && ' text-green-500 '
					} ${crypto.price_change_percentage_24h < 0 && ' text-red-500 '}`}
				>
					{crypto.price_change_percentage_24h > 0 && (
						<span>
							<BsArrowUpShort />
						</span>
					)}
					{crypto.price_change_percentage_24h < 0 && (
						<span>
							<BsArrowDownShort />
						</span>
					)}
					{crypto.price_change_percentage_24h ?? '-'}%
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span
					className={`flex items-center justify-end ${
						crypto.price_change_percentage_7d > 0 && ' text-green-500 '
					} ${crypto.price_change_percentage_7d < 0 && ' text-red-500 '}`}
				>
					{crypto.price_change_percentage_7d > 0 && (
						<span>
							<BsArrowUpShort />
						</span>
					)}
					{crypto.price_change_percentage_7d < 0 && (
						<span>
							<BsArrowDownShort />
						</span>
					)}
					{crypto.price_change_percentage_7d}%
				</span>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				{formatFullAmount(Number(crypto.volume_24h * crypto.price))}{' '}
				{crypto.currency}
			</td>
			<td className={`${thStyles} pr-2 md:pr-5 text-nowrap`}>
				{formatFullAmount(crypto.market_cap)} {crypto.currency}
			</td>
		</tr>
	);
}
