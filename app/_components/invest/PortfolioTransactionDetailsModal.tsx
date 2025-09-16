import {
	PortfolioCryptoTransaction,
	PortfolioStockTransaction,
} from '@/app/_redux/features/portfiolioApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { formatDateLabel, formatTime } from '@/app/_utils/formatDate';
import Image from 'next/image';
import Button from '../Button';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import DeleteCurrentAssetPortfolioTransactionsModal from './DeleteCurrentAssetPortfolioTransactionsModal';
import ManagePortfolioTransactionModal from './ManangePortfolioTransactionModal';

interface PortfolioTransactionDetailsModalProps {
	onCloseModal: () => void;
	transaction: PortfolioCryptoTransaction | PortfolioStockTransaction;
	portfolioId: string;
	assetType: 'crypto' | 'stocks';
}

export default function PortfolioTransactionDetailsModal({
	onCloseModal,
	transaction,
	portfolioId,
	assetType,
}: PortfolioTransactionDetailsModalProps) {
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
		<div className='space-y-6'>
			<ModalHeader onCloseModal={onCloseModal} title='Transakcja' />
			<div className='flex flex-col gap-3 mx-auto'>
				<div className='flex flex-col gap-1 items-center'>
					{'crypto' in transaction && (
						<Image
							alt={`${transactionAsset.name}-logo`}
							src={`${transactionAsset.icon}`}
							width={48}
							height={48}
						/>
					)}
					{'stock' in transaction && (
						<p
							className={`flex items-center justify-center w-12 h-12 text-lg aspect-square bg-main text-white rounded-full`}
						>
							{transactionAsset?.name.trimStart().charAt(0).toUpperCase()}
						</p>
					)}
					<p className='text-xl font-medium'>
						{transaction?.transaction_type === 'buy' && 'Kup'}
						{transaction?.transaction_type === 'sell' && 'Sprzedaj'}{' '}
						{transactionAsset.name}
					</p>
					<p
						className={`text-3xl font-medium ${
							transaction?.transaction_type === 'buy' && 'text-green-500'
						} ${transaction?.transaction_type === 'sell' && 'text-red-500'}`}
					>
						{transaction?.transaction_type === 'buy' && '+'}
						{transaction?.transaction_type === 'sell' && '-'}{' '}
						{transaction?.amount} {transactionAsset.symbol.toUpperCase()}
					</p>
					<p className='text-xl font-normal text-gray-600'>
						Wartość{' '}
						{transaction &&
							formatFullPrice(
								transaction?.amount * transaction?.price_per_unit
							)}
					</p>
				</div>
				<div className='divide-y-2'>
					<p className='flex flex-col md:flex-row justify-between py-3'>
						<span className='text-gray-600'>Cena za aktywo</span>
						<span className='font-medium'>
							{formatFullPrice(transaction?.price_per_unit)}
						</span>
					</p>
					<p className='flex flex-col md:flex-row justify-between py-3'>
						<span className='text-gray-600'>Zysk / Strata</span>
						<span className='font-medium'>
							{formatFullPrice(transaction?.profit_loss)}
						</span>
					</p>
					<p className='flex flex-col md:flex-row justify-between py-3'>
						<span className='text-gray-600'>Data</span>
						<span className='font-medium'>
							{formatDateLabel(transaction?.transaction_date)}{' '}
							{formatTime(transaction?.transaction_date)}
						</span>
					</p>
					<p className='flex flex-col  justify-between py-3'>
						<span className='text-gray-600'>Opis</span>
						<span className='font-medium'>
							{transaction?.description || 'Brak opisu'}
						</span>
					</p>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-3'>
				<Modal>
					<Modal.Open opens='deletePortfolioTransaction'>
						<Button type='button' size='small' color='light'>
							Usuń transakcję
						</Button>
					</Modal.Open>
					<Modal.Window name='deletePortfolioTransaction'>
						<DeleteCurrentAssetPortfolioTransactionsModal
							onCloseModal={() => undefined}
							portfolioId={portfolioId}
							assetType={assetType}
							transaction={transaction}
						/>
					</Modal.Window>
				</Modal>
				<Modal>
					<Modal.Open opens='editPortfolioTransaction'>
						<Button type='button' size='small' color='dark'>
							Edytuj transakcję
						</Button>
					</Modal.Open>
					<Modal.Window name='editPortfolioTransaction'>
						<ManagePortfolioTransactionModal
							transaction={transaction}
							onCloseModal={() => undefined}
							portfolioId={portfolioId}
							assetType={assetType}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</div>
	);
}
