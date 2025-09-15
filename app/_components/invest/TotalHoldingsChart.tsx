'use client';

import { useEffect, useState } from 'react';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import InfoCard from '../InfoCard';

interface CryptosPercentageHoldings {
	[key: string]: number;
}

type Holding = {
	symbol: string;
	percentage: number;
	fill?: string;
};

const colors = [
	'#3c37ff',
	'#2563eb',
	'#6366f1',
	'#8b5cf6',
	'#a855f7',
	'#d946ef',
	'#ec4899',
];

export default function TotalHoldingsChart({
	cryptosPercentageHoldings = {},
}: {
	cryptosPercentageHoldings: CryptosPercentageHoldings;
}) {
	const [windowWidth, setWindowWidth] = useState<number | null>(null);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const holdingsList = cryptosPercentageHoldings
		? Object.entries(cryptosPercentageHoldings).map(([symbol, percentage]) => ({
				symbol,
				percentage,
		  }))
		: [];

	const displayData = holdingsList.map((el, index) => {
		return { ...el, fill: colors[index] };
	});

	return (
		<InfoCard title='Całkowite udziały'>
			<ResponsiveContainer width='100%' className={'min-h-[400px]'}>
				<PieChart>
					<Pie
						innerRadius={80}
						outerRadius={110}
						fill='#3c37ff'
						paddingAngle={6}
						dataKey='percentage'
						data={displayData}
						animationDuration={300}
					/>
					<Legend
						align={windowWidth && windowWidth < 1024 ? 'center' : 'right'}
						verticalAlign={`${
							windowWidth && windowWidth < 1024 ? 'bottom' : 'middle'
						}`}
						wrapperStyle={{
							width:
								windowWidth && windowWidth < 1024
									? '100%'
									: windowWidth && windowWidth > 1200
									? '40%'
									: 'auto',
						}}
						layout='vertical'
						style={{ width: '100%' }}
						content={({ payload }) => {
							return (
								<div>
									{payload?.map((entry, index) => {
										const entryPayload = entry.payload as Holding;
										console.log(entryPayload.symbol);
										return (
											<div
												className='flex flex-row justify-between w-full gap-10 text-base'
												key={`item-${index}`}
											>
												<div className='flex flex-row items-center gap-1'>
													<div
														style={{ backgroundColor: entryPayload.fill }}
														className='w-4 h-4 rounded-full'
													></div>
													<span className='text-gray-600 font-normal '>
														{entryPayload.symbol.toLowerCase() === 'other'
															? 'Inne'
															: entryPayload.symbol.toUpperCase()}
													</span>
												</div>
												<p className=''>{entryPayload.percentage}%</p>
											</div>
										);
									})}
								</div>
							);
						}}
					/>
					<Tooltip
						isAnimationActive={false}
						content={({ payload, active }) => {
							if (active && payload && payload.length) {
								return (
									<div className='rounded-lg border border-grayThird shadow-md  bg-white px-4 py-2 text-sm'>
										<p className='font-normal text-gray-600'>
											{payload[0].payload.symbol.toLowerCase() === 'other'
												? 'Inne'
												: payload[0].payload.symbol.toUpperCase()}
											:{' '}
											<span className='text-black'>
												{payload[0].payload.percentage}%
											</span>
										</p>
									</div>
								);
							}
							return null;
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</InfoCard>
	);
}
