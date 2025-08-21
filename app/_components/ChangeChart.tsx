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
import { StockHistoricalData } from '../_actions/stockActions';

interface ChangeChartProps {
	chartData: StockHistoricalData[];
}

export default function ChangeChart({ chartData }: ChangeChartProps) {
	const firstDate = new Date(chartData[0].date);
	const lastDate = new Date(chartData[chartData.length - 1].date);
	const diffInDays =
		(lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);

	const ticks = chartData
		.filter((item, index, arr) => {
			const date = new Date(item.date);
			const prev = arr[index - 1] ? new Date(arr[index - 1].date) : null;
			if (!prev) return true;

			if (diffInDays > 365) {
				return date.getFullYear() !== prev.getFullYear();
			} else if (diffInDays <= 7) {
				return true;
			} else {
				return (
					date.getMonth() !== prev.getMonth() ||
					date.getFullYear() !== prev.getFullYear()
				);
			}
		})
		.map((item) => item.date);

	return (
		<ResponsiveContainer width='100%' height={400}>
			<AreaChart data={chartData} margin={{ right: 25, left: 30 }}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='date'
					ticks={ticks}
					axisLine={false}
					tickLine={false}
					tickMargin={10}
					tickFormatter={(dateStr) => {
						const date = new Date(dateStr);

						if (diffInDays > 365) {
							return date.getFullYear().toString();
						} else if (diffInDays <= 7) {
							return date.toLocaleDateString('pl-PL', {
								day: '2-digit',
								month: 'short',
							});
						} else {
							return date.toLocaleDateString('pl-PL', {
								month: 'short',
								year: 'numeric',
							});
						}
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
										<span className='text-gray-600'>Wartość:</span>{' '}
										<span className='font-medium'>
											{payload[0].value.toLocaleString('pl-PL', {
												style: 'currency',
												currency: 'PLN',
												minimumFractionDigits: 2,
											})}
										</span>
									</p>
									<p>
										<span className='text-gray-600'>Wolumen: </span>
										<span className='font-medium'>
											{payload[0].payload.volume.toLocaleString('pl-PL', {
												style: 'currency',
												currency: 'PLN',
												minimumFractionDigits: 2,
											})}
										</span>
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
	);
}
