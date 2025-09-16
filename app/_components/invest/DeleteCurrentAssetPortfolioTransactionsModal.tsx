import toast from 'react-hot-toast';
import Button from '../Button';
import ModalHeader from '../ModalHeader';
import {
	PortfolioCryptoTransaction,
	PortfolioStockTransaction,
	useDeleteCurrentAssetPortfolioTransactionMutationMutation,
} from '@/app/_redux/features/portfiolioApiSlice';

interface DeleteCurrentPortfolioTransactionModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	assetSymbol?: string;
	assetType: 'crypto' | 'stock';
	transaction?: PortfolioCryptoTransaction | PortfolioStockTransaction;
}

export default function DeleteCurrentPortfolioTransactionModal({
	onCloseModal,
	portfolioId,
	assetType,
	transaction,
}: DeleteCurrentPortfolioTransactionModalProps) {
	const [
		deletePortfolioTransactions,
		{ isLoading: isPortfolioTransactionDeleting },
	] = useDeleteCurrentAssetPortfolioTransactionMutationMutation();

	function handleDeleteTransactions() {
		if (assetType === 'crypto') {
			deletePortfolioTransactions({
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
						isLoading={isPortfolioTransactionDeleting}
						onClick={handleDeleteTransactions}
					>
						Usuń transakcję
					</Button>
				</div>
			</div>
		</div>
	);
}
