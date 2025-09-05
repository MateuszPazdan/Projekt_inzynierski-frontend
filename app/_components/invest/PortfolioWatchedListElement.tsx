'use client';

import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import PercentageChange from '../market/PercentageChange';
import { thStyles } from './PortfolioWatchedList';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PortfolioAsset } from '@/app/_redux/features/portfiolioApiSlice';

interface PortfolioWatchedListElementProps {
	watchedElement?: { id: number; crypto: PortfolioAsset };
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
						<span>{watchedElement?.crypto?.symbol.toUpperCase()}</span>
						<span className='text-sm text-gray-700'>Bitcoin</span>
					</p>
				</Link>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				<span className='flex flex-col items-end text-right'>
					{formatFullPrice(Number(watchedElement?.id))}
					<PercentageChange
						change={Number(watchedElement?.id) * (30 - 1) + 1}
					/>
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{formatFullPrice(Number(watchedElement?.id) * (100 - 1) + 1)}
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{' '}
					{formatFullPrice(Number(watchedElement?.id) * 1000)}
				</span>
			</td>
			<td className={`${thStyles}`}>
				<span className={`flex items-center justify-end`}>
					{' '}
					{formatFullPrice(Number(watchedElement?.id) * 500)}
				</span>
			</td>
			<td className={`${thStyles} text-nowrap`}>
				{formatFullPrice(Number(watchedElement?.id) * 100)}
			</td>
			<td className={`${thStyles} text-nowrap`}>
				<span className='flex flex-col items-end'>
					<span>{formatFullPrice(Number(watchedElement?.id))}</span>
					<span className='text-gray-600'>
						{Number(Number(watchedElement?.id) * 10).toFixed(2)}{' '}
						{watchedElement?.crypto.symbol.toUpperCase()}
					</span>
				</span>
			</td>
		</tr>
	);
}
