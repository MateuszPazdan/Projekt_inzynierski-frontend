import { useDeleteWatchedCryptoPortfolioMutation } from '@/app/_redux/features/portfiolioApiSlice';
import toast from 'react-hot-toast';
import Button from '../Button';
import ModalHeader from '../ModalHeader';
import { useRouter } from 'next/navigation';

interface DeleteWatchedAssetModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	assetSymbol: string;
	assetType: 'crypto' | 'stock';
}

export default function DeleteWatchedAssetModal({
	onCloseModal,
	portfolioId,
	assetSymbol,
	assetType,
}: DeleteWatchedAssetModalProps) {
	const router = useRouter();
	const [deleteWatchedCrypto, { isLoading: isWatchedCryptoDeleting }] =
		useDeleteWatchedCryptoPortfolioMutation();

	function handleDeleteTransactions() {
		if (assetType === 'crypto') {
			deleteWatchedCrypto({
				portfolio_id: portfolioId,
				crypto_symbol: assetSymbol,
			})
				.unwrap()
				.then(() => {
					toast.success('Usunięto aktywo z portfela.');
					onCloseModal();
					router.replace(`/app/invest/crypto/${portfolioId}`);
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
			<ModalHeader title={'Usuwanie aktywa'} onCloseModal={onCloseModal} />
			<div className='gap-10 py-5'>
				<p className='text-gray-700 md:text-center md:flex flex-col md:mx-auto text-lg'>
					Na pewno chcesz usunąć aktywo z portfela? Tego nie da się cofnąć.
				</p>
				<div className='flex justify-center pt-10'>
					<Button
						type='button'
						color='danger'
						isLoading={isWatchedCryptoDeleting}
						onClick={handleDeleteTransactions}
					>
						Usuń aktywo
					</Button>
				</div>
			</div>
		</div>
	);
}
