import { formatShortPrice } from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../InfoCard';

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
			text={`${amount > 0 ? '+' : ''}${formatShortPrice(amount)} PLN`}
		/>
	);
}
