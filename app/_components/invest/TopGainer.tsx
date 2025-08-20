import { formatFullAmount } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';

interface TopGainerProps {
	topGainer: {
		amount: number;
		percentage: number;
		assetName: string;
		icon: string;
	};
}

export default function TopGainer({ topGainer }: TopGainerProps) {
	const { amount, assetName, icon } = topGainer;
	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
			<p className='text-lg xl:text-xl font-medium mb-2'>
				Najwięcej zystukjąca inwestycja
			</p>
			<div className='flex flex-row items-center gap-1'>
				<Image src={icon} alt={assetName} width={24} height={24} />
				<p className='flex flex-row items-center gap-1'>
					{assetName}
					<span
						className={` ${amount > 0 && 'text-green-500'} ${
							amount < 0 && 'text-red-500'
						}`}
					>
						{amount > 0 && '+'}
						{/* {amount < 0 && '-'} */}
						{formatFullAmount(amount)} PLN
					</span>
				</p>
			</div>
		</div>
	);
}
