import { useDeleteAllTransactionsCryptoPortfolioMutation } from '@/app/_redux/features/portfiolioApiSlice';
import toast from 'react-hot-toast';
import Button from '../Button';
import ModalHeader from '../ModalHeader';

interface DeletePortfolioTransactionsModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	assetType: 'crypto' | 'stocks';
	assetSymbol?: string;
}

export default function DeletePortfolioTransactionsModal({
	onCloseModal,
	portfolioId,
	assetType,
	assetSymbol,
}: DeletePortfolioTransactionsModalProps) {
	const [deleteTransactions, { isLoading: isTransactionDeleting }] =
		useDeleteAllTransactionsCryptoPortfolioMutation();

	function handleDeleteTransactions() {
		if (assetType === 'crypto') {
			deleteTransactions({
				portfolioId: portfolioId,
				cryptoSymbol: assetSymbol,
			})
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
