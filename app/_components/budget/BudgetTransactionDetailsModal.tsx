import { Transaction } from '@/app/_redux/features/budgetApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { formatDateLabel, formatTime } from '@/app/_utils/formatDate';
import Button from '../Button';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import BudgetDeleteTransactionModal from './BudgetDeleteTransactionModal';
import BudgetManageTransactionModal from './BudgetManageTransactionModal';

interface BudgetTransactionDetailsModalProps {
	onCloseModal: () => void;
	transaction: Transaction;
}

export default function BudgetTransactionDetailsModal({
	onCloseModal,
	transaction,
}: BudgetTransactionDetailsModalProps) {
	return (
		<div className='space-y-6'>
			<ModalHeader onCloseModal={onCloseModal} title='Transakcja' />
			<div className='divide-y-2'>
				<p className='flex flex-col md:flex-row justify-between py-3'>
					<span className='text-gray-600'>Wartość transakcji</span>
					<span
						className={`font-medium ${
							transaction?.transaction_type === '+' && 'text-green-500'
						} ${transaction?.transaction_type === '-' && 'text-red-500'}`}
					>
						{transaction?.transaction_type === '-' && '-'}
						{formatFullPrice(transaction?.amount)}
					</span>
				</p>
				<p className='flex flex-col md:flex-row justify-between py-3'>
					<span className='text-gray-600'>Kategoria</span>
					<span className='font-medium'>{transaction?.category?.name}</span>
				</p>
				<p className='flex flex-col md:flex-row justify-between py-3'>
					<span className='text-gray-600'>Data</span>
					<span className='font-medium'>
						{formatDateLabel(transaction?.transaction_date)}{' '}
						{formatTime(transaction?.transaction_date)}
					</span>
				</p>
				<p className='flex flex-col md:flex-row flex-wrap justify-between py-3'>
					<span className='text-gray-600 pr-2'>Opis</span>
					<span className='font-medium'>
						{transaction?.description || 'Brak opisu'}
					</span>
				</p>
			</div>
			<div className='grid grid-cols-2 gap-3'>
				<Modal>
					<Modal.Open opens='deletePortfolioTransaction'>
						<Button type='button' size='small' color='light'>
							Usuń transakcję
						</Button>
					</Modal.Open>
					<Modal.Window name='deletePortfolioTransaction'>
						<BudgetDeleteTransactionModal
							onCloseModal={() => undefined}
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
						<BudgetManageTransactionModal
							budgetId={transaction.budget_id}
							transaction={transaction}
							onCloseModal={() => undefined}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</div>
	);
}
