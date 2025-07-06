'use client';

import { Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

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
	return (
		<div className='flex flex-col rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
			<p className='text-xl font-medium mb-2'>Całkowite udziały</p>
			<ResponsiveContainer width='100%' height={300}>
				<PieChart>
					<Pie
						dataKey='value'
						data={data}
						cx='50%'
						cy='50%'
						outerRadius={90}
						fill='#000000'
						label
					/>
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
