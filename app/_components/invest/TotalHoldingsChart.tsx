'use client';

import { useEffect, useState } from 'react';
import {
	DefaultLegendContentProps,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

const data = [
	{ name: 'BTC', value: 20, fill: '#f9844a' },
	{ name: 'ETH', value: 10, fill: '#f9c74f' },
	{ name: 'S', value: 35, fill: '#90be6d' },
	{ name: 'XRP', value: 5, fill: '#43aa8b' },
	{ name: 'ALGO', value: 15, fill: '#4d908e' },
	{ name: 'MATIC', value: 15, fill: '#577590' },
	{ name: 'inne', value: 15, fill: '#577590' },
];

export default function TotalHoldingsChart() {
	const [windowWidth, setWindowWidth] = useState<number | null>(null);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<div className='flex flex-col rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
			<p className='text-lg xl:text-xl font-medium mb-2'>Całkowite udziały</p>
			<ResponsiveContainer
				width='100%'
				height={windowWidth && windowWidth < 768 ? 500 : 400}
			>
				<PieChart>
					<Pie
						innerRadius={80}
						outerRadius={110}
						fill='#8884d8'
						paddingAngle={5}
						dataKey='value'
						data={data}
						cx='50%'
						cy='50%'
						activeShape
						animationDuration={300}
					/>
					<Legend
						content={renderLegend}
						align={windowWidth && windowWidth < 768 ? 'center' : 'right'}
						verticalAlign={`${
							windowWidth && windowWidth < 768 ? 'bottom' : 'middle'
						}`}
						layout='vertical'
					/>
					<Tooltip
						isAnimationActive={false}
						content={({ payload, active }) => {
							if (active && payload && payload.length) {
								return (
									<div className='rounded-lg border border-grayThird shadow-md  bg-white px-4 py-2 text-sm'>
										<p className='font-medium'>{payload[0]?.name}</p>{' '}
										{payload[0]?.value}%
									</div>
								);
							}
							return null;
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

const renderLegend = ({ payload }: DefaultLegendContentProps) => {
	if (!payload) return null;
	return (
		<ul className='flex flex-col  gap-2 '>
			{payload?.map((entry, index) => {
				return (
					<li
						className='flex flex-row gap-2 items-center'
						key={`item-${index}`}
					>
						<span
							className='w-4 h-4  inline-block rounded-full'
							style={{ backgroundColor: entry?.color }}
						></span>
						<p className='text-gray-700 text-sm'>
							{entry?.payload?.value} {entry?.value}
						</p>
					</li>
				);
			})}
		</ul>
	);
};
