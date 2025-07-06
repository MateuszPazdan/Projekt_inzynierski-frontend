'use client';

import { useEffect, useState } from 'react';
import { Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

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
			<p className='text-xl font-medium mb-2'>Całkowite udziały</p>
			<ResponsiveContainer
				width='100%'
				height={windowWidth && windowWidth < 768 ? 500 : 400}
			>
				<PieChart>
					<Pie
						activeShape={renderActiveShape}
						innerRadius={80}
						outerRadius={110}
						fill='#8884d8'
						paddingAngle={5}
						dataKey='value'
						data={data}
						cx='50%'
						cy='50%'
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
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

const renderLegend = (props) => {
	const { payload } = props;
	console.log(props);
	return (
		<ul className='flex flex-col  gap-2 '>
			{payload.map((entry, index) => {
				console.log(entry);
				return (
					<li
						className='flex flex-row gap-2 items-center'
						key={`item-${index}`}
					>
						<span
							className='w-4 h-4  inline-block rounded-full'
							style={{ backgroundColor: entry.color }}
						></span>
						<p className='text-gray-700 text-sm'>
							{entry.payload.value} {entry.value}
						</p>
					</li>
				);
			})}
		</ul>
	);
};

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
		name,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill='none'
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill='#333'
			>{`${value} ${name}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill='#999'
			>
				{` ${(percent * 100).toFixed(2)}%`}
			</text>
		</g>
	);
};
