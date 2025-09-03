import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../InfoCard';
import PercentageChange from '../market/PercentageChange';

interface TotalPortfolioChangeProps {
	investmentChange: { amount: number; percentage: number };
}

export default function TotalPortfolioChange({
	investmentChange,
}: TotalPortfolioChangeProps) {
	const { amount, percentage } = investmentChange;
	return (
		<InfoCard
			title='Całkowity zysk/strata'
			additionalInfo={<PercentageChange change={percentage} />}
		>
			<p
				className={`flex flex-row items-center gap-2 ${
					amount < 0 ? 'text-red-500' : amount > 0 ? 'text-green-500' : ''
				}`}
			>
				{amount > 0 ? '+' : ''}
				{formatFullPrice(amount)}
			</p>
		</InfoCard>
	);
}
