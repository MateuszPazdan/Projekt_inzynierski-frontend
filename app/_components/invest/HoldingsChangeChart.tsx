'use client';

import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import InfoCard from '../InfoCard';

interface HoldingsChangeChartProps {
	chartData: { date: string; value: number }[];
}

export default function HoldingsChangeChart({
	chartData,
}: HoldingsChangeChartProps) {
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
			} else if (diffInDays <= 31 && diffInDays >= 1) {
				return (
					date.getDate() !== prev.getDate() ||
					date.getMonth() !== prev.getMonth()
				);
			} else if (diffInDays < 1) {
				return date.getHours() !== prev.getHours();
			} else {
				return (
					date.getMonth() !== prev.getMonth() ||
					date.getFullYear() !== prev.getFullYear()
				);
			}
		})
		.map((item) => item.date);

	return (
		<InfoCard title='Zmiana wartości'>
			<ResponsiveContainer width='100%' height={400}>
				<AreaChart data={chartData} margin={{ right: 0, left: 0 }}>
					<CartesianGrid
						vertical={false}
						horizontal={false}
						strokeOpacity={0.5}
					/>
					<XAxis
						dataKey='date'
						ticks={ticks}
						axisLine={false}
						tickLine={false}
						minTickGap={40}
						style={{ fontSize: 14 }}
						tickFormatter={(dateStr) => {
							const date = new Date(dateStr);

							if (diffInDays > 365) {
								return date.getFullYear().toString();
							} else if (diffInDays < 1) {
								return date.toLocaleTimeString('pl-PL', {
									hour: '2-digit',
									minute: '2-digit',
								});
							} else if (diffInDays <= 7) {
								return date.toLocaleDateString('pl-PL', {
									day: '2-digit',
									month: 'short',
								});
							} else {
								return date.toLocaleDateString('pl-PL', {
									day: 'numeric',
									month: 'short',
								});
							}
						}}
					/>

					<YAxis
						dataKey={'value'}
						axisLine={false}
						tickLine={false}
						domain={[0, (dataMax) => dataMax * 1.05]}
						tickMargin={10}
						scale={'sequential'}
						orientation={'right'}
						tickFormatter={(value) => {
							return formatFullPrice(value);
						}}
						style={{ fontSize: 12 }}
						width={'auto'}
						type='number'
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
												{formatFullPrice(payload[0].value)}
											</span>
										</p>
										<p>
											<span className='text-gray-600'>Wolumen: </span>
											<span className='font-medium'>
												{formatFullPrice(payload[0].payload.volume)}
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
						dataKey='value'
						name='Wartość'
						stroke='#3c37ff'
						fillOpacity={1}
						fill='url(#colorUv)'
						strokeWidth={2}
						activeDot={{ r: 5 }}
					/>
					<defs>
						<linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='10%' stopColor='#3c37ff' stopOpacity={0.7} />
							<stop offset='70%' stopColor='#3c37ff' stopOpacity={0.2} />
							<stop offset='100%' stopColor='#3c37ff' stopOpacity={0} />
						</linearGradient>
					</defs>
				</AreaChart>
			</ResponsiveContainer>
		</InfoCard>
	);
}
