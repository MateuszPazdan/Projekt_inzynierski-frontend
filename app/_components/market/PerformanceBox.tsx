interface PerformanceBoxProps {
	label: string;
	value?: number;
}

export default function PerformanceBox({ label, value }: PerformanceBoxProps) {
	const formatter = new Intl.NumberFormat('pl-PL', {
		maximumFractionDigits: 2,
	});
	return (
		<div className='flex flex-col gap-1 bg-grayOne rounded-md p-3 px-1 border border-grayThird'>
			<p className='text-sm text-gray-500'>{label}</p>
			{!value ? (
				<span className={`font-medium`}>-</span>
			) : (
				<span
					className={`font-medium text-sm ${
						value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : ''
					}`}
				>
					{value != null ? `${formatter.format(value)}%` : '-'}
				</span>
			)}
		</div>
	);
}
