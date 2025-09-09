import { PortfolioCryptoTransaction } from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { formatTime } from '@/app/_utils/formatDate';
import Image from 'next/image';
import PercentageChange from '../market/PercentageChange';
import { thStyles } from './crypto/CurrentCryptoPortfolioTransactions';

interface PortfolioTransactionListElementProps {
	transaction: PortfolioCryptoTransaction;
	onClick?: () => void;
}
export default function PortfolioTransactionListElement({
	transaction,
	onClick,
}: PortfolioTransactionListElementProps) {
	return (
		<tr
			onClick={onClick}
			key={transaction.id}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} text-left`}>
				<span className='flex flex-row items-center gap-3'>
					<Image
						alt={`${transaction?.crypto.name}-logo`}
						src={`${transaction?.crypto.icon}`}
						width={24}
						height={24}
					/>
					<span className='flex flex-col items-start gap-1'>
						<span
							className={`${
								transaction.transaction_type === 'buy'
									? 'text-green-500'
									: transaction.transaction_type === 'sell'
									? 'text-red-500'
									: ''
							}`}
						>
							{transaction.transaction_type === 'buy'
								? 'Kup'
								: transaction.transaction_type === 'sell'
								? 'Sprzedaj'
								: ''}{' '}
							{transaction.crypto.symbol.toUpperCase()}
						</span>
						<span className='font-normal text-gray-600'>
							{formatTime(transaction.transaction_date)}
						</span>
					</span>
				</span>
			</td>
			<td className={thStyles}>{transaction.amount}</td>
			<td className={thStyles}>
				{formatFullPrice(transaction.price_per_unit)}
			</td>
			<td className={thStyles}>
				{formatFullPrice(transaction.amount * transaction.price_per_unit)}
			</td>
			<td className={thStyles}>
				<p
					className={`flex flex-col gap-1 items-end ${
						transaction.profit_loss > 0
							? 'text-green-500'
							: transaction.profit_loss < 0
							? 'text-red-500'
							: ''
					}`}
				>
					<span className='text-base'>
						{formatFullPrice(transaction.profit_loss)}
					</span>
					<span>
						<PercentageChange change={transaction.profit_loss_percentage} />
					</span>
				</p>
			</td>
		</tr>
	);
}
