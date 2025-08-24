import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

export default function PriceChange({ change }: { change: number }) {
	return (
		<span className='flex flex-row items-center gap-1 w-fit'>
			{change < 0 && <FaAngleDown className='text-sm text-red-500' />}
			{change > 0 && <FaAngleUp className='text-sm text-green-500' />}
			<span
				className={`${
					change < 0 ? ' text-red-500 ' : change > 0 ? 'text-green-500' : ''
				}`}
			>
				{change?.toFixed(1)}%
			</span>
		</span>
	);
}
