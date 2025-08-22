'use client';

import { StockDetails, StockHistoricalData } from '@/app/_actions/stockActions';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '../Button';
import { PiStar } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import StockPriceSection from './StockPriceSection';

interface StockDetailsProps {
	stockDetails: StockDetails;
	chartData: StockHistoricalData[];
}

export default function StockDetailsCard({
	stockDetails,
	chartData,
}: StockDetailsProps) {
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-row justify-between gap-5 items-center pb-5'>
				<div className='flex flex-row gap-2 md:gap-4 items-center'>
					<p
						className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-2xl aspect-square bg-main text-white rounded-full`}
					>
						{stockDetails?.name.trimStart().charAt(0).toUpperCase()}
					</p>
					<p className='flex flex-col items-start justify-center '>
						<span className='sm:text-lg md:text-xl font-semibold'>
							{stockDetails.name}
						</span>
						<span className='text-sm md:text-base text-gray-600'>
							{stockDetails.symbol}
						</span>
					</p>
				</div>
				<>
					<div className='md:hidden'>
						<Button size='icon' color='light'>
							<BsThreeDotsVertical />
						</Button>
					</div>
					<div className='hidden md:flex gap-2 '>
						<Button size='icon' color='light' onClick={() => {}}>
							<PiStar className='text-yellow-500 text-2xl' />
						</Button>
						<Button
							size='large'
							additionalClasses='h-12'
							color='light'
							onClick={() => {}}
						>
							<FaPlus className='mr-2 text-gray-500 font-semibold' />
							<span>Dodaj do inwestycji</span>
						</Button>
					</div>
				</>
			</div>
			<div className='grid grid-cols-[1fr_auto] gap-3'>
				<StockPriceSection chartData={chartData} stockDetails={stockDetails} />
				<div className='flex flex-col gap-5 rounded-lg border border-grayThird shadow-md  bg-white p-3 px-5 overflow-hidden'></div>
			</div>
			(
			<div className='space-y-8'>
				{/* Dane rynkowe */}
				<div className='rounded-2xl border border-gray-200 shadow-sm bg-white p-4'>
					<h2 className='text-lg font-semibold mb-3'>📊 Dane rynkowe</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'>
						<div>
							<p className='text-sm text-gray-500'>Waluta</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.currency}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Stan rynku</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.market_state}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Zmiana 1h</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.price_change_percentage_1h} %
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Zmiana 24h</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.price_change_percentage_24h} %
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Zmiana 7 dni</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.price_change_percentage_7d} %
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Wolumen 24h</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.volume_24h?.toLocaleString()}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Śr. wolumen (10d)</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.average_volume_10d?.toLocaleString()}
							</p>
						</div>
					</div>
				</div>

				{/* Spółka */}
				<div className='rounded-2xl border border-gray-200 shadow-sm bg-white p-4'>
					<h2 className='text-lg font-semibold mb-3'>🏢 Spółka</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'>
						<div>
							<p className='text-sm text-gray-500'>Sektor</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.sector}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Liczba pracowników</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.employees?.toLocaleString()}
							</p>
						</div>
						<div className='col-span-2'>
							<p className='text-sm text-gray-500'>Opis</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.description}
							</p>
						</div>
					</div>
				</div>

				{/* Kapitalizacja */}
				<div className='rounded-2xl border border-gray-200 shadow-sm bg-white p-4'>
					<h2 className='text-lg font-semibold mb-3'>
						💰 Kapitalizacja i akcje
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'>
						<div>
							<p className='text-sm text-gray-500'>Kapitalizacja rynkowa</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.market_cap?.toLocaleString()}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Akcje w obiegu</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.circulating_supply?.toLocaleString()}
							</p>
						</div>
					</div>
				</div>

				{/* Wskaźniki finansowe */}
				<div className='rounded-2xl border border-gray-200 shadow-sm bg-white p-4'>
					<h2 className='text-lg font-semibold mb-3'>
						📈 Rentowność i wskaźniki
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'>
						<div>
							<p className='text-sm text-gray-500'>P/E</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.pe_ratio}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>EPS (TTM)</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.eps_trailing_twelve_months}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>P/B</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.price_to_book}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>P/S</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.price_to_sales}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Beta</p>
							<p className='text-base font-medium text-gray-800'>{stockDetails.beta}</p>
						</div>
					</div>
				</div>

				{/* Finanse i dywidendy */}
				<div className='rounded-2xl border border-gray-200 shadow-sm bg-white p-4'>
					<h2 className='text-lg font-semibold mb-3'>💵 Finanse i dywidendy</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'>
						<div>
							<p className='text-sm text-gray-500'>Dług / kapitał (D/E)</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.debt_to_equity}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Wolne przepływy pieniężne</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.free_cashflow?.toLocaleString()}
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>ROE</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.return_on_equity} %
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Stopa dywidendy (12M)</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.trailing_annual_dividend_yield} %
							</p>
						</div>
						<div>
							<p className='text-sm text-gray-500'>Payout ratio</p>
							<p className='text-base font-medium text-gray-800'>
								{stockDetails.payout_ratio} %
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
