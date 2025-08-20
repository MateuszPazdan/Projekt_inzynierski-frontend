import ModalHeader from '../ModalHeader';
import Button from '../Button';
import {
	Budget,
	useDeleteAllTransactionsMutation,
} from '@/app/_redux/features/budgetApiSlice';
import toast from 'react-hot-toast';

interface DeleteAllTransactionsModalProps {
	onCloseModal: () => void;
	budget: Budget;
}

export default function DeleteAllTransactionsModal({
	onCloseModal,
	budget,
}: DeleteAllTransactionsModalProps) {
	const [deleteTransactions, { isLoading: isTransactionDeleting }] =
		useDeleteAllTransactionsMutation();

	function handleDeleteTransactions() {
		deleteTransactions(budget)
			.unwrap()
			.then(() => {
				toast.success('Usunięto transakcje.');
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
			<ModalHeader
				title={'Czyszczenie transakcji'}
				onCloseModal={onCloseModal}
			/>
			<div className='gap-10 py-5'>
				<p className='text-gray-700 md:text-center md:flex flex-col md:mx-auto text-lg'>
					Na pewno chcesz usunąć wszystkie transakcje? Tego nie da się cofnąć.
				</p>
				<div className='flex justify-center pt-10'>
					<Button
						type='button'
						color='danger'
						isLoading={isTransactionDeleting}
						onClick={handleDeleteTransactions}
					>
						Wyczyść transakcje
					</Button>
				</div>
			</div>
		</div>
	);
}
