'use client';

import { formatShortAmount } from '@/app/_utils/formatAmountOfMoney';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { StockDetails, StockHistoricalData } from '../_actions/stockActions';
import PeriodSelect from './PeriodSelect';

interface ChangeChartProps {
	chartData: StockHistoricalData[];
	stockDetails: StockDetails;
}

export default function ChangeChart({
	chartData,
	stockDetails,
}: ChangeChartProps) {
	const minPrice = Math.min(...chartData.map((data) => data.low_price));
	const maxPrice = Math.max(...chartData.map((data) => data.high_price));
	const pricePercent =
		((stockDetails.price - minPrice) / (maxPrice - minPrice)) * 100;
	console.log(pricePercent);

	return (
		<div className='flex flex-col rounded-lg border border-grayThird shadow-md  bg-white p-3 px-5 overflow-hidden'>
			<div className='flex flex-col gap-3 pb-5'>
				<p className='flex flex-row gap-2 items-center '>
					<span
						className={`flex items-center justify-center w-7 h-7 aspect-square bg-main text-white rounded-full`}
					>
						{stockDetails?.name.trimStart().charAt(0).toUpperCase()}
					</span>
					<span className='text-gray-600 text-sm'>
						{stockDetails?.name} Cena
					</span>
				</p>
				<p className='text-2xl sm:text-3xl font-medium'>
					<span>{stockDetails?.currency}</span> {stockDetails?.price.toFixed(2)}{' '}
				</p>
				<div className='grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr_auto] gap-1 sm:gap-2 md:gap-3 items-center text-xs '>
					<p className='sm:order-1 '>
						<span className='hidden sm:inline text-gray-500'>Minimum</span>{' '}
						<span className='font-medium text-gray-500 sm:text-black'>
							{minPrice.toFixed(2)} {stockDetails?.currency}
						</span>
					</p>
					<p className='sm:order-3 text-right'>
						<span className='hidden sm:inline text-gray-500'>Maksimum</span>{' '}
						<span className='font-medium text-gray-500 sm:text-black'>
							{maxPrice.toFixed(2)} {stockDetails?.currency}
						</span>
					</p>
					<div className='sm:order-2 col-span-2 sm:col-span-1 w-full relative bg-grayOne border border-grayThird h-2 rounded-lg overflow-hidden'>
						<div
							className='absolute h-full transition-all duration-300 ease-in-out'
							style={{
								width: `${pricePercent}%`,
								background:
									'linear-gradient(to right, #add7f6, #2520e3, #3c37ff)',
							}}
						></div>
					</div>
				</div>
				<PeriodSelect />
			</div>
			<ResponsiveContainer width='100%' height={400}>
				<AreaChart data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey='date'
						axisLine={false}
						tickMargin={5}
						tickFormatter={(currData) => {
							const date = new Date(currData);
							return date.toLocaleDateString('pl-PL', {
								day: '2-digit',
								month: 'short',
							});
						}}
					/>
					<YAxis
						dataKey={'close_price'}
						axisLine={false}
						tickLine={false}
						domain={['dataMin', 'auto']}
						tickMargin={10}
						scale={'auto'}
						orientation={'right'}
						tickFormatter={(value) => {
							return formatShortAmount(value);
						}}
					/>

					<Tooltip
						content={({ active, payload, label }) => {
							if (active && payload && payload.length) {
								const date = new Date(label as string);
								const formattedDate = date.toLocaleDateString('pl-PL', {
									hour: '2-digit',
									minute: '2-digit',
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								});

								return (
									<div className='rounded-lg border border-grayThird shadow-md  bg-white px-4 py-2 text-sm'>
										<p className='font-medium'>{formattedDate}</p>
										<p>
											Wartość:{' '}
											{payload[0].value.toLocaleString('pl-PL', {
												style: 'currency',
												currency: 'PLN',
												minimumFractionDigits: 2,
											})}
										</p>
										<p>
											Wolumen:{' '}
											{payload[0].payload.volume.toLocaleString('pl-PL', {
												style: 'currency',
												currency: 'PLN',
												minimumFractionDigits: 2,
											})}
										</p>
									</div>
								);
							}

							return null;
						}}
					/>

					<Area
						type='linear'
						dataKey='close_price'
						name='Wartość portfela'
						stroke='#3c37ff'
						fillOpacity={1}
						fill='url(#colorUv)'
						strokeWidth={2}
						activeDot={{ r: 5 }}
					/>
					<defs>
						<linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='10%' stopColor='#3c37ff' stopOpacity={0.7} />
							<stop offset='90%' stopColor='#3c37ff' stopOpacity={0.1} />
						</linearGradient>
					</defs>
					{/* <Brush height={30} strokeWidth={1} stroke='#3e37ff'>
						<LineChart>
							<Line
								type='linear'
								dataKey='close_price'
								stroke='#3c37ff'
								strokeWidth={1}
								dot={false}
							/>
						</LineChart>
					</Brush> */}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
