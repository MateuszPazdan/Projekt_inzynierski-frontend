import { formatFullAmount } from '@/app/_utils/formatAmountOfMoney';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

interface TotalPortfolioChangeProps {
	investmentChange: { amount: number; percentage: number };
}

export default function TotalPortfolioChange({
	investmentChange,
}: TotalPortfolioChangeProps) {
	const { amount, percentage } = investmentChange;
	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
			<p className='flex flex-row items-center gap-2 text-lg xl:text-xl font-medium mb-2'>
				Całkowity zysk/strata
				<span
					className={`flex items-center text-base  ${
						amount > 0 && ' text-green-500 '
					} ${amount < 0 && ' text-red-500 '}`}
				>
					{amount > 0 && (
						<span>
							<BsArrowUpShort />
						</span>
					)}
					{amount < 0 && (
						<span>
							<BsArrowDownShort />
						</span>
					)}
					{percentage}%
				</span>
			</p>
			<p
				className={` ${amount > 0 && ' text-green-500 '} ${
					amount < 0 && ' text-red-500 '
				}`}
			>
				{amount > 0 && '+'}
				{/* {amount < 0 && '-'} */}
				{formatFullAmount(amount)}
			</p>
		</div>
	);
}
