import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../InfoCard';
import PercentageChange from '../market/PercentageChange';

interface PortfolioChangeProps {
	investmentChange: { amount: number; percentage: number };
}

export default function PortfolioChange({
	investmentChange,
}: PortfolioChangeProps) {
	const { amount, percentage } = investmentChange;
	return (
		<InfoCard
			title='Zmiana 24h'
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
