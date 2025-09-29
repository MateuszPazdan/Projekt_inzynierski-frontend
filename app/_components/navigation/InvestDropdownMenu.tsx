'use client';

import {
	PortfolioInfo,
	useRetrieveCryptoPortfoliosQuery,
	useRetrieveStockPortfoliosQuery,
} from '@/app/_redux/features/portfiolioApiSlice';
import { formatShortPrice } from '@/app/_utils/formatAmountOfMoney';
import Link from 'next/link';
import { useState } from 'react';
import {
	FaAngleDown,
	FaAngleRight,
	FaBitcoin,
	FaChartArea,
} from 'react-icons/fa6';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuElement from '../DropdownMenuElement';
import PercentageChange from '../market/PercentageChange';
import EmptyList from '../EmptyList';
import { useRouter } from 'next/navigation';
import Spinner from '../Spinner';

export default function InvestDropdownMenu() {
	const [isPortfolioTypeMenuOpen, setIsPortfolioTypeMenuOpen] = useState(false);
	const [portfolioType, setPortfolioType] = useState<'crypto' | 'stocks'>(
		'crypto'
	);
	const router = useRouter();

	const { data: cryptoData, isLoading: isCryptoDataLoading } =
		useRetrieveCryptoPortfoliosQuery({
			page: 1,
			size: 3,
		});
	const { data: stockData, isLoading: isStockDataLoading } =
		useRetrieveStockPortfoliosQuery({
			page: 1,
			size: 3,
		});

	return (
		<div className='min-w-[300px]'>
			<div className='grid grid-cols-[1fr_auto] pb-3'>
				<DropdownMenu
					isExtended={isPortfolioTypeMenuOpen}
					setIsExtended={setIsPortfolioTypeMenuOpen}
					distanceFromTop={120}
					customOpenIcon={
						<div className='w-[170px] flex flex-row justify-between items-center gap-2 p-3 border border-graySecond text-gray-600 rounded-md hover:bg-grayOne duration-300 transition-colors'>
							<p className='flex flex-row items-center gap-1'>
								<span className='text-xl'>
									{portfolioType === 'crypto' && <FaBitcoin />}
									{portfolioType === 'stocks' && <FaChartArea />}
								</span>
								<span>
									{portfolioType === 'crypto' ? 'Kryptowaluty' : 'Akcje'}
								</span>
							</p>
							<FaAngleDown />
						</div>
					}
				>
					<div className='w-[154px]'>
						<DropdownMenuElement
							icon={<FaBitcoin className='text-xl' />}
							text='Kryptowaluty'
							onClick={() => {
								setPortfolioType('crypto');
								setIsPortfolioTypeMenuOpen(false);
							}}
						/>
						<DropdownMenuElement
							icon={<FaChartArea className='text-xl' />}
							text='Akcje'
							onClick={() => {
								setPortfolioType('stocks');
								setIsPortfolioTypeMenuOpen(false);
							}}
						/>
					</div>
				</DropdownMenu>
				<Link
					href={`/app/invest/${portfolioType}`}
					className='flex items-center justify-end text-gray-700 hover:text-second transition-colors duration-300'
				>
					<span className='flex flex-row items-center gap-1'>
						<span>Pokaż więcej</span> <FaAngleRight className='text-inherit' />
					</span>
				</Link>
			</div>
			<div className='flex flex-col'>
				{portfolioType === 'crypto' ? (
					isCryptoDataLoading ? (
						<span className='py-8'>
							<Spinner size='small' />
						</span>
					) : (
						cryptoData &&
						cryptoData.items.map((item) => (
							<DropdownPortfolioElement
								portfolio={item}
								key={item.id}
								onClick={() => {
									setPortfolioType('crypto');
									router.push(`/app/invest/crypto/${item.id}`);
								}}
							/>
						))
					)
				) : portfolioType === 'stocks' ? (
					isStockDataLoading ? (
						<span className='py-8'>
							<Spinner size='small' />
						</span>
					) : (
						stockData &&
						stockData.items.map((item) => (
							<DropdownPortfolioElement
								portfolio={item}
								key={item.id}
								onClick={() => {
									setPortfolioType('stocks');
									router.push(`/app/invest/stocks/${item.id}`);
								}}
							/>
						))
					)
				) : (
					<div className='px-2'>
						<EmptyList
							title='Brak portfeli'
							description='Stwórz nowy portfel, aby go tutaj zobaczyć'
						/>
					</div>
				)}
			</div>
		</div>
	);
}

function DropdownPortfolioElement({
	portfolio,
	onClick,
}: {
	portfolio: PortfolioInfo;
	onClick: () => void;
}) {
	return (
		<button
			onClick={() => onClick()}
			className='min-h-[64px] flex flex-row items-center justify-between p-2 hover:bg-grayOne transition-colors duration-300 rounded-md'
		>
			<div className='flex flex-row items-center gap-2'>
				<span
					className={`flex items-center justify-center w-6 h-6 text-xs aspect-square text-white rounded-full`}
					style={{ backgroundColor: portfolio?.color }}
				>
					{portfolio?.title.trimStart().charAt(0).toUpperCase()}
				</span>
				<p className='flex flex-col'>
					<span className='text-base line-clamp-1'>{portfolio?.title}</span>
				</p>
			</div>
			<div className='flex flex-col justify-center items-end gap-1 text-sm'>
				<p className='text-nowrap'>
					{formatShortPrice(portfolio?.current_value)}
				</p>
				<span className='text-sm'>
					<PercentageChange change={portfolio.profit_loss_percentage} />
				</span>
			</div>
		</button>
	);
}
