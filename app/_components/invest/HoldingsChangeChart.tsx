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

const data = [
	{ time: '2024-06-29', price: 1605.23 },
	{ time: '2024-06-30', price: 1600.23 },
	{ time: '2024-07-01', price: 1604.23 },
	{ time: '2024-07-02', price: 1605.23 },
	{ time: '2024-07-03', price: 1606.23 },
	{ time: '2024-07-04', price: 1607.23 },
	{ time: '2024-07-05', price: 1606.23 },
];

export default function HoldingsChangeChart() {
	return (
		<InfoCard title='Całkowita zmiana'>
			<ResponsiveContainer width='100%' height={400}>
				<AreaChart data={data}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey='time'
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
						dataKey={'price'}
						axisLine={false}
						tickLine={false}
						domain={['dataMin', 'auto']}
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
									</div>
								);
							}

							return null;
						}}
					/>

					<Area
						type='linear'
						dataKey='price'
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
				</AreaChart>
			</ResponsiveContainer>
		</InfoCard>
	);
}
