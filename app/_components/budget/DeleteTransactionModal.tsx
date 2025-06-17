import ModalHeader from '../ModalHeader';
import Button from '../Button';
import {
	Transaction,
	useDeleteTransactionMutation,
} from '@/app/_redux/features/budgetApiSlice';
import toast from 'react-hot-toast';

interface DeleteTransactionModalProps {
	onCloseModal: () => void;
	transaction: Transaction;
}

export default function DeleteTransactionModal({
	onCloseModal,
	transaction,
}: DeleteTransactionModalProps) {
	const [deleteTransaction, { isLoading: isTransactionDeleting }] =
		useDeleteTransactionMutation();

	function handleDeleteTransaction() {
		deleteTransaction(transaction)
			.unwrap()
			.then(() => {
				toast.success('Usunięto transakcję.');
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error?.data?.detail || 'Wystąpił błąd przy usuwaniu transakcji.'
				);
			});
	}

	return (
		<div>
			<ModalHeader title={'Usuwanie transakcji'} onCloseModal={onCloseModal} />
			<div className='flex flex-col gap-6 py-5'>
				<p className='text-gray-700 md:text-center md:flex flex-col md:mx-auto text-lg'>
					<span> Czy na pewno chcesz usunąć tę transakcję? </span>
					<span>Tej operacji nie będzie można cofnąć.</span>
				</p>
				<div className='flex justify-center pt-5'>
					<Button
						type='button'
						color='danger'
						isLoading={isTransactionDeleting}
						onClick={handleDeleteTransaction}
					>
						Usuń transakcję
					</Button>
				</div>
			</div>
		</div>
	);
}
