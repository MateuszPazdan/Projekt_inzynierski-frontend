import {
	formatFullPrice,
	formatShortPrice,
} from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../InfoCard';

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
			text={`${amount > 0 ? '+' : ''}${formatFullPrice(amount)} PLN`}
		/>
	);
}
