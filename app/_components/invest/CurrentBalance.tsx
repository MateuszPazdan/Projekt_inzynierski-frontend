import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../InfoCard';

export default function CurrentBalance({
	balance,
	isLoading,
}: {
	balance?: number;
	isLoading?: boolean;
}) {
	return (
		<InfoCard
			title='Szacowana wartość'
			text={`${balance ? formatFullPrice(balance) : 'Brak danych'}`}
			isLoading={isLoading}
		/>
	);
}
