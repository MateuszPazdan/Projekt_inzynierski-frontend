import { PortfolioCryptoTransaction } from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { useState } from 'react';

interface PortfolioTransactionElementProps {
	transaction: PortfolioCryptoTransaction;
}

export default function PortfolioTransactionElement({
	transaction,
}: PortfolioTransactionElementProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<div
			className={`border-b border-grayThird py-4 last:border-b-0 transition-all duration-300 px-2 md:px-5 ${
				isExpanded ? 'bg-grayOne ' : ''
			}`}
		>
			<div className='grid grid-cols-6 items-center gap-2'>
				<span className=''>{transaction.transaction_type}</span>

				<span className=''>{formatFullPrice(transaction.price_per_unit)}</span>

				<span className=' '>{transaction.amount}</span>
				<span className=' '>
					{formatFullPrice(transaction.amount * transaction.price_per_unit)}
				</span>
				<span className=' '>{transaction.profit_loss}</span>

				<button
					onClick={() => setIsExpanded((prev) => !prev)}
					className='flex items-center justify-center p-2 bg-transparent hover:bg-graySecond transition-colors rounded-md min-w-8'
					aria-label='Rozwiń szczegóły'
				>
					akcja
				</button>
			</div>
		</div>
	);
}
