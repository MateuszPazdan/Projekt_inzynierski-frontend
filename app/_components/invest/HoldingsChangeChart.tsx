'use client';

import {
	Area,
	AreaChart,
	Brush,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

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
		<div className='flex flex-col rounded-lg border border-grayThird shadow-md  bg-white p-3 px-5 overflow-hidden'>
			<p className='text-xl font-medium mb-2'>Całkowita zmiana</p>
			<ResponsiveContainer width='100%' height={400}>
				<AreaChart
					data={data}
					margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
				>
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
						scale={'auto'}
						orientation={'right'}
						tickFormatter={(value) => {
							if (value >= 1_000_000) {
								const mln = value / 1_000_000;
								const mlnLabel = Number.isInteger(mln)
									? `${mln}`
									: `${mln.toPrecision(3)}`;
								return `${mlnLabel}\u00A0mln\u00A0zł`;
							}

							return Number(value).toLocaleString('pl-PL', {
								style: 'currency',
								currency: 'PLN',
								currencySign: 'standard',
								minimumFractionDigits: 0,
								useGrouping: true,
							});
						}}
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
					<Brush height={30} strokeWidth={1} stroke='#3e37ff'>
						<LineChart>
							<Line
								type='linear'
								dataKey='price'
								stroke='#3c37ff'
								strokeWidth={1}
								dot={false}
							/>
						</LineChart>
					</Brush>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
