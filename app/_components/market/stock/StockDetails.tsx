'use client';

import { StockDetails } from '@/app/_actions/stockActions';
import StockPriceSection from './StockPriceSection';
import StockDetailsHeader from './StockDetailsHeader';
import { useRetrieveStockPricePerformanceQuery } from '@/app/_redux/features/marketApiSlice';

interface StockDetailsProps {
	stockDetails: StockDetails;
}

export default function StockDetailsCard({ stockDetails }: StockDetailsProps) {
	const { data: stockPricePerformance } = useRetrieveStockPricePerformanceQuery(
		{
			stock_symbol: stockDetails.symbol,
		}
	);

	if (!stockPricePerformance) return;

	return (
		<div className='flex flex-col gap-3'>
			<StockDetailsHeader stockDetails={stockDetails} />
			<div className='grid xl:grid-cols-[3fr_1fr] grid-rows-[1fr_auto] h-fit gap-3'>
				<StockPriceSection stockDetails={stockDetails} />
				<div className='row-span-2 flex flex-col gap-5 rounded-lg border border-grayThird shadow-md  bg-white py-3 px-5 overflow-hidden'>
					<div>
						<span className='text-gray-600 text-sm font-medium mb-2 block'>
							Zmiana wartości
						</span>
						<div className='grid grid-cols-3 gap-3 justify-between text-center'>
							<div className='flex flex-col gap-1 bg-grayOne rounded-md p-3  border border-grayThird'>
								<p className='text-sm text-gray-500'>1h</p>
								<p
									className={`font-medium ${
										stockPricePerformance?.price_change_percentage_1h < 0
											? ' text-red-500 '
											: stockPricePerformance.price_change_percentage_1h === 0
											? ''
											: ' text-green-500 '
									}`}
								>
									{stockPricePerformance.price_change_percentage_1h ?? '-'}%
								</p>
							</div>
							<div className='flex flex-col gap-1 bg-grayOne rounded-md p-3  border border-grayThird'>
								<p className='text-sm text-gray-500'>24h</p>
								<p
									className={`font-medium ${
										stockPricePerformance.price_change_percentage_24h < 0
											? ' text-red-500 '
											: stockPricePerformance.price_change_percentage_24h === 0
											? ''
											: ' text-green-500 '
									}`}
								>
									{stockPricePerformance.price_change_percentage_24h ?? '-'}%
								</p>
							</div>
							<div className='flex flex-col gap-1 bg-grayOne rounded-md p-3  border border-grayThird'>
								<p className='text-sm text-gray-500'>7 dni</p>
								<p
									className={`font-medium ${
										stockPricePerformance.price_change_percentage_7d < 0
											? ' text-red-500 '
											: stockPricePerformance.price_change_percentage_7d === 0
											? ''
											: ' text-green-500 '
									}`}
								>
									{stockPricePerformance.price_change_percentage_7d ?? '-'}%
								</p>
							</div>
						</div>
					</div>
					<div className='grid sm:grid-cols-2 gap-4 xl:grid-cols-1 font-medium'>
						<InfoItem label='Stan rynku' value={stockDetails.market_state} />
						<InfoItem
							label='Wolumen 24h'
							value={stockDetails.volume_24h?.toLocaleString()}
						/>
						<InfoItem
							label='Śr. wolumen (10d)'
							value={stockDetails.average_volume_10d?.toLocaleString()}
						/>
						<InfoItem
							label='Kapitalizacja rynkowa'
							value={stockDetails.market_cap?.toLocaleString()}
						/>
						<InfoItem
							label='Dostępna podaż'
							value={stockDetails.circulating_supply?.toLocaleString()}
						/>
						<InfoItem label='P/E' value={stockDetails.pe_ratio} />
						<InfoItem
							label='EPS (TTM)'
							value={stockDetails.eps_trailing_twelve_months}
						/>
						<InfoItem label='P/B' value={stockDetails.price_to_book} />
						<InfoItem label='P/S' value={stockDetails.price_to_sales} />
						<InfoItem label='Beta' value={stockDetails.beta} />
						<InfoItem
							label='Dług / kapitał (D/E)'
							value={stockDetails.debt_to_equity}
						/>
						<InfoItem
							label='Wolne przepływy pieniężne'
							value={stockDetails.free_cashflow?.toLocaleString()}
						/>
						<InfoItem
							label='ROE'
							value={`${stockDetails.return_on_equity ?? '-'} %`}
						/>
						<InfoItem
							label='Stopa dywidendy (12M)'
							value={`${stockDetails.trailing_annual_dividend_yield ?? '-'} %`}
						/>
						<InfoItem
							label='Payout ratio'
							value={`${stockDetails.payout_ratio ?? '-'} %`}
						/>
					</div>
				</div>
				<div className='grid grid-rows-[auto_auto] gap-4 rounded-lg border border-grayThird shadow-md  bg-white py-3 px-5 overflow-hidden'>
					<div className='col-span-1'>
						<p className='text-gray-600 text-sm'>Sektor</p>
						<p className='font-medium'>{stockDetails.sector ?? '-'}</p>
					</div>
					<div className='col-span-1'>
						<p className='text-gray-600 text-sm'>Liczba pracowników</p>
						<p className='font-medium'>
							{stockDetails.employees?.toLocaleString() ?? '-'}
						</p>
					</div>
					<div className='col-span-2'>
						<p className='text-gray-600 text-sm'>Opis</p>
						<p className='font-medium'>{stockDetails.description ?? '-'}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

const InfoItem = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<div>
		<span className='text-gray-600 text-sm'>{label}</span>
		<p className='font-medium'>{value ?? '-'}</p>
	</div>
);
