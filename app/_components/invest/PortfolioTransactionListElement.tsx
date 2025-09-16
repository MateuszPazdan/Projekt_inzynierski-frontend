import {
	PortfolioCryptoTransaction,
	PortfolioStockTransaction,
} from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { formatTime } from '@/app/_utils/formatDate';
import Image from 'next/image';
import PercentageChange from '../market/PercentageChange';
import { thStyles } from './crypto/CurrentCryptoPortfolioTransactions';

interface PortfolioTransactionListElementProps {
	transaction: PortfolioCryptoTransaction | PortfolioStockTransaction;
	onClick?: () => void;
}
export default function PortfolioTransactionListElement({
	transaction,
	onClick,
}: PortfolioTransactionListElementProps) {
	const transactionAsset =
		'crypto' in transaction
			? {
					...transaction.crypto,
			  }
			: {
					...transaction.stock,
					icon: '',
			  };

	return (
		<tr
			onClick={onClick}
			key={transaction.id}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} text-left`}>
				<span className='flex flex-row items-center gap-3'>
					{'crypto' in transaction && (
						<Image
							alt={`${transactionAsset.name}-logo`}
							src={`${transactionAsset.icon}`}
							width={24}
							height={24}
						/>
					)}
					{'stock' in transaction && (
						<p
							className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
						>
							{transactionAsset?.name.trimStart().charAt(0).toUpperCase()}
						</p>
					)}
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
							{transactionAsset?.symbol.toUpperCase()}
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
