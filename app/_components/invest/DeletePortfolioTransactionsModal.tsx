import ModalHeader from '../ModalHeader';
import Button from '../Button';
import toast from 'react-hot-toast';
import { useDeleteAllTransactionsCryptoPortfolioMutation } from '@/app/_redux/features/portfiolioApiSlice';

interface DeletePortfolioTransactionsModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	portfolioType: 'crypto' | 'stocks';
}

export default function DeletePortfolioTransactionsModal({
	onCloseModal,
	portfolioId,
	portfolioType,
}: DeletePortfolioTransactionsModalProps) {
	const [deleteTransactions, { isLoading: isTransactionDeleting }] =
		useDeleteAllTransactionsCryptoPortfolioMutation();

	function handleDeleteTransactions() {
		if (portfolioType === 'crypto') {
			deleteTransactions(portfolioId)
				.unwrap()
				.then(() => {
					toast.success('Usunięto transakcje.');
					onCloseModal();
				})
				.catch((error) => {
					toast.error(
						error?.data?.detail || 'Wystąpił błąd przy usuwaniu transakcji.'
					);
					onCloseModal();
				});
		}
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
