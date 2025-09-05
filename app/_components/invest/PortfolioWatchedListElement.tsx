'use client';

import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import PercentageChange from '../market/PercentageChange';
import { thStyles } from './PortfolioWatchedList';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PortfolioWatchedListElementProps {
	watchedElement: {
		id: number;
		crypto: {
			symbol: string;
		};
	};
}

export default function PortfolioWatchedListElement({
	watchedElement,
}: PortfolioWatchedListElementProps) {
	const router = useRouter();

	function handleNavigate() {
		router.push(`/market/crypto/`);
	}

	return (
		<tr
			onClick={() => handleNavigate()}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} `}>
				<Link
					onClick={(e) => e.stopPropagation()}
					href={'/btc'}
					className='flex flex-row items-center gap-2'
				>
					<Image
						alt='crypto-logo'
						src={'/bitcoin-logo-svgrepo-com.svg'}
						width={24}
						height={24}
					/>
					<p className='flex flex-col items-start text-left'>
						<span>Bitcoin</span>
						<span className='text-sm text-gray-700'>
							{watchedElement.crypto.symbol}
						</span>
					</p>
				</Link>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				<span className='flex flex-col items-end text-right'>
					{formatFullPrice(403059.99)}
					<PercentageChange change={2.4} />
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{formatFullPrice(16874.4)}
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{' '}
					{formatFullPrice(813307.1)}
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{' '}
					{formatFullPrice(359564.55)}
				</span>
			</td>
			<td className={`${thStyles} text-nowrap`}>{formatFullPrice(42444.1)}</td>
			<td className={`${thStyles} text-nowrap`}>{formatFullPrice(752562.2)}</td>
		</tr>
	);
}
