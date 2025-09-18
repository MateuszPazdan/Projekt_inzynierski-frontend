'use client';

import { useRetrieveStockPortfolioDetailsQuery } from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { notFound } from 'next/navigation';
import { BsPlus } from 'react-icons/bs';
import Button from '../../Button';
import InfoCard from '../../InfoCard';
import Modal from '../../Modal';
import ManagePortfolioTransactionModal from '../ManangePortfolioTransactionModal';
import ManageAssetTransactionsBtn from '../crypto/ManageCryptoTransactionsBtn';
import { useEffect } from 'react';

interface CurrentStockPortfolioOverviewProps {
	portfolioId: string;
	stockSymbol: string;
}

export default function CurrentStockPortfolioOverview({
	portfolioId,
	stockSymbol,
}: CurrentStockPortfolioOverviewProps) {
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveStockPortfolioDetailsQuery(portfolioId);

	useEffect(() => {
		document.title = `${stockSymbol.toUpperCase()} | ${
			portfolioDetails?.title || 'Przegląd portfela'
		} | Asset Flow`;
	}, [portfolioDetails, stockSymbol]);

	if (!portfolioDetails && !isPortfolioDetailsLoading) return notFound();

	const currentStock = portfolioDetails?.watched_stocks.find(
		(stock) => stock.stock.symbol === stockSymbol
	);

	if (!currentStock && !isPortfolioDetailsLoading) return notFound();

	return (
		<>
			<div className='flex flex-col md:flex-row justify-between gap-5 items-center pb-5'>
				<div className='flex flex-row md:flex-col justify-between md:justify-center gap-5 md:gap-2 items-center md:items-start w-full md:w-fit'>
					{!isPortfolioDetailsLoading ? (
						<>
							<div className='flex flex-row items-center gap-1 md:items-start'>
								<p
									className={`flex items-center justify-center w-7 h-7 text-xs aspect-square bg-main text-white rounded-full`}
								>
									{currentStock?.stock.name.trimStart().charAt(0).toUpperCase()}
								</p>
								<div className='flex flex-col items-start justify-center '>
									<span className='text-lg font-medium'>
										{currentStock?.stock.name}
									</span>
								</div>
							</div>
							<p className='text-lg md:text-3xl font-semibold'>
								{formatFullPrice(currentStock?.stock.price)}
							</p>
						</>
					) : (
						<>
							<div className='h-7 w-7 md:w-14 md:h-14 rounded-full shimmer' />
							<div className='h-6 w-32 sm:w-44 rounded shimmer' />
						</>
					)}
				</div>
				<div className='flex flex-row gap-3 w-full md:w-fit'>
					<ManageAssetTransactionsBtn
						portfolioId={portfolioId}
						assetSymbol={stockSymbol}
						isLoading={isPortfolioDetailsLoading}
						assetType='stocks'
					/>

					<Modal>
						<Modal.Open opens='addPortfolioTransaction'>
							<Button
								size='large'
								additionalClasses='h-12'
								color='dark'
								onClick={() => {}}
								stretch
							>
								<BsPlus className='text-3xl' />
								<span className='mr-3'>Dodaj transakcję</span>
							</Button>
						</Modal.Open>
						<Modal.Window name='addPortfolioTransaction'>
							<ManagePortfolioTransactionModal
								onCloseModal={() => undefined}
								portfolioId={portfolioId}
								cryptoSymbol={stockSymbol}
								assetType='stocks'
							/>
						</Modal.Window>
					</Modal>
				</div>
			</div>
			<div className='grid xl:grid-cols-5 gap-2'>
				<InfoCard
					title='Wartość aktywów'
					text={formatFullPrice(currentStock?.current_value)}
					isLoading={isPortfolioDetailsLoading}
				/>
				<InfoCard title='Zasoby' isLoading={isPortfolioDetailsLoading}>
					<p className='text-nowrap'>
						{currentStock?.holdings} {currentStock?.stock.symbol.toUpperCase()}
					</p>
				</InfoCard>
				<InfoCard
					title='Koszt całkowity'
					text={formatFullPrice(currentStock?.total_invested)}
					isLoading={isPortfolioDetailsLoading}
				/>
				<InfoCard
					title='Średni koszt'
					text={formatFullPrice(currentStock?.avg_buy_price)}
					isLoading={isPortfolioDetailsLoading}
				/>
				<InfoCard
					title='Całkowity zysk / strata'
					isLoading={isPortfolioDetailsLoading}
				>
					<p
						className={`${
							currentStock &&
							(currentStock?.profit_loss > 0
								? 'text-green-500'
								: currentStock?.profit_loss < 0
								? 'text-red-500'
								: '')
						}`}
					>
						{formatFullPrice(currentStock?.profit_loss)}
					</p>
				</InfoCard>
			</div>
		</>
	);
}
