import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../InfoCard';
import PercentageChange from '../market/PercentageChange';

interface PortfolioChangeProps {
	profit_loss?: number;
	profit_loss_percentage?: number;
	isLoading?: boolean;
}

export default function PortfolioChange({
	profit_loss,
	profit_loss_percentage,
	isLoading,
}: PortfolioChangeProps) {
	return (
		<InfoCard
			title='Zmiana 24h'
			additionalInfo={<PercentageChange change={profit_loss_percentage} />}
			isLoading={isLoading}
		>
			{profit_loss ? (
				<p
					className={`flex flex-row items-center gap-2 ${
						profit_loss < 0
							? 'text-red-500'
							: profit_loss > 0
							? 'text-green-500'
							: ''
					}`}
				>
					{profit_loss > 0 ? '+' : ''}
					{formatFullPrice(profit_loss)}
				</p>
			) : (
				<p>Brak danych</p>
			)}
		</InfoCard>
	);
}
