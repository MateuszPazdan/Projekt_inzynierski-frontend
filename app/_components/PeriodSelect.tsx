'use client';
import { useId } from 'react';

interface PeriodSelectProps {
	range: string;
	setRange: (val: string) => void;
}

export default function PeriodSelect({ range, setRange }: PeriodSelectProps) {
	const id = useId();

	const options = [
		{ value: '1d', label: '24h' },
		{ value: '1w', label: '7d' },
		{ value: '1m', label: '1m' },
		{ value: '1y', label: '1y' },
		{ value: 'max', label: 'Wszystko' },
	];

	return (
		<div className='flex items-center w-full gap-1 sm:gap-2 bg-grayOne border border-grayThird rounded-md p-1 text-xs sm:text-sm text-gray-600'>
			{options.map((opt) => (
				<label
					key={opt.value}
					className='w-full flex items-center justify-center'
				>
					<input
						type='radio'
						name={`range-${id}`}
						value={opt.value}
						checked={range === opt.value}
						onChange={() => setRange(opt.value)}
						className='hidden peer'
					/>
					<span className='px-2 sm:px-5 py-1 rounded-lg font-medium w-full text-center hover:bg-graySecond peer-checked:bg-white peer-checked:text-main peer-checked:shadow cursor-pointer transition-colors duration-300 truncate '>
						{opt.label}
					</span>
				</label>
			))}
		</div>
	);
}
