'use client';

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const data = [
	{ time: '29.06', pv: 60984.23 },
	{ time: '30.06', pv: 61203.56 },
	{ time: '01.07', pv: 60000.45 },
	{ time: '02.07', pv: 59810.12 },
	{ time: '03.07', pv: 60234.89 },
	{ time: '04.07', pv: 61012.77 },
	{ time: '05.07', pv: 61540.67 },
];

export default function HoldingsChangeChart() {
	return (
		<div className='flex flex-col rounded-lg border border-grayThird shadow-md  bg-white p-3 px-5'>
			<p className='text-xl font-medium mb-2'>Całkowita zmiana</p>
			<ResponsiveContainer width='100%' height={300}>
				<LineChart
					data={data}
					margin={{
						top: 50,
						right: 20,
						left: 20,
						bottom: 50,
					}}
				>
					<XAxis dataKey='time' axisLine={false} tickMargin={30} />
					<YAxis axisLine={false} unit='zł' tickMargin={10} />
					<Tooltip />
					<CartesianGrid vertical={false} />
					<Line
						type='monotone'
						dataKey='pv'
						stroke='#3c37ff'
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
