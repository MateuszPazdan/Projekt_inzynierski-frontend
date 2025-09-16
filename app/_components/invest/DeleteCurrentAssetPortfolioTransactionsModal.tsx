import toast from 'react-hot-toast';
import Button from '../Button';
import ModalHeader from '../ModalHeader';
import {
	PortfolioCryptoTransaction,
	PortfolioStockTransaction,
	useDeleteCurrentCryptoPortfolioTransactionMutationMutation,
	useDeleteCurrentStockPortfolioTransactionMutationMutation,
} from '@/app/_redux/features/portfiolioApiSlice';

interface DeleteCurrentPortfolioTransactionModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	assetSymbol?: string;
	assetType: 'crypto' | 'stocks';
	transaction?: PortfolioCryptoTransaction | PortfolioStockTransaction;
}

export default function DeleteCurrentPortfolioTransactionModal({
	onCloseModal,
	portfolioId,
	assetType,
	transaction,
}: DeleteCurrentPortfolioTransactionModalProps) {
	const [
		deleteCryptoPortfolioTransactions,
		{ isLoading: isCryptoPortfolioTransactionDeleting },
	] = useDeleteCurrentCryptoPortfolioTransactionMutationMutation();
	const [
		deleteStockPortfolioTransactions,
		{ isLoading: isStockPortfolioTransactionDeleting },
	] = useDeleteCurrentStockPortfolioTransactionMutationMutation();

	function handleDeleteTransactions() {
		if (assetType === 'crypto') {
			deleteCryptoPortfolioTransactions({
				portfolio_id: portfolioId,
				transaction_id: transaction?.id,
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
		if (assetType === 'stocks') {
			deleteStockPortfolioTransactions({
				portfolio_id: portfolioId,
				transaction_id: transaction?.id,
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
			<ModalHeader title={'Usuwanie transakcji'} onCloseModal={onCloseModal} />
			<div className='gap-10 py-5'>
				<p className='text-gray-700 md:text-center md:flex flex-col md:mx-auto text-lg'>
					Na pewno chcesz usunąć tę transakcje? Tego nie da się cofnąć.
				</p>
				<div className='flex justify-center pt-10'>
					<Button
						type='button'
						color='danger'
						isLoading={
							isCryptoPortfolioTransactionDeleting ||
							isStockPortfolioTransactionDeleting
						}
						onClick={handleDeleteTransactions}
					>
						Usuń transakcję
					</Button>
				</div>
			</div>
		</div>
	);
}
