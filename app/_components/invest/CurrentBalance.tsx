import { formatFullPrice, formatShortPrice } from '@/app/_utils/formatAmountOfMoney';
import InfoCard from '../InfoCard';

export default function CurrentBalance({ balance }: { balance: number }) {
	return (
		<InfoCard
			title='Szacowana wartość'
			text={`${formatFullPrice(balance)} PLN`}
		/>
	);
}
