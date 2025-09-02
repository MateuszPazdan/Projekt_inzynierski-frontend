import { formatShortPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import InfoCard from '../InfoCard';
import PercentageChange from '../market/PercentageChange';

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
		<InfoCard title='Najwięcej zystukjąca inwestycja'>
			<div className='grid grid-cols-[1fr_auto] gap-1 text-sm pt-1'>
				<div className='flex flex-row items-center gap-2'>
					{'icon' in topGainer && icon ? (
						<Image src={`${icon}`} alt={assetName} width={28} height={28} />
					) : (
						<p
							className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
						>
							{assetName.trimStart().charAt(0).toUpperCase()}
						</p>
					)}
					<p className='font-medium text-xl truncate'>{assetName}</p>
				</div>

				<div className='flex sm:items-center flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse'>
					<p className='font-medium text-xl'>+{formatShortPrice(amount)}</p>
				</div>
			</div>
		</InfoCard>
	);
}
