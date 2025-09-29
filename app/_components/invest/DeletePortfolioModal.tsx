import {
	useDeleteCryptoPortfolioMutation,
	useDeleteStockPortfolioMutation,
} from '@/app/_redux/features/portfiolioApiSlice';
import { useRouter } from 'next/navigation';
import ModalHeader from '../ModalHeader';
import Button from '../Button';
import toast from 'react-hot-toast';

interface DeletePortfolioModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	assetType: 'crypto' | 'stocks';
}

export default function DeletePortfolioModal({
	onCloseModal,
	portfolioId,
	assetType,
}: DeletePortfolioModalProps) {
	const [deleteCryptoPortfolio, { isLoading: isCryptoPortfolioDeleting }] =
		useDeleteCryptoPortfolioMutation();
	const [deleteStockPortfolio, { isLoading: isStockPortfolioDeleting }] =
		useDeleteStockPortfolioMutation();

	const router = useRouter();

	function handleDeletePortfolio() {
		if (assetType === 'crypto') {
			deleteCryptoPortfolio(portfolioId)
				.unwrap()
				.then(() => {
					toast.success('Usunięto portfel.');
					onCloseModal();
					router.push('/app/invest/crypto');
				})
				.catch((error) => {
					toast.error(
						error?.data?.detail || 'Wystąpił błąd przy usuwaniu portfela.'
					);
				});
		}
		if (assetType === 'stocks') {
			deleteStockPortfolio(portfolioId)
				.unwrap()
				.then(() => {
					toast.success('Usunięto portfel.');
					onCloseModal();
					router.push('/app/invest/stocks');
				})
				.catch((error) => {
					toast.error(
						error?.data?.detail || 'Wystąpił błąd przy usuwaniu portfela.'
					);
				});
		}
	}

	return (
		<div>
			<ModalHeader title={'Usuwanie portfela'} onCloseModal={onCloseModal} />
			<div className='gap-6 py-5'>
				<p className='text-gray-700 md:text-center md:flex flex-col md:mx-auto text-lg'>
					Na pewno chcesz usunąć portfel? Tego nie da się cofnąć.
				</p>
				<div className='flex justify-center pt-10'>
					<Button
						type='button'
						color='danger'
						isLoading={isCryptoPortfolioDeleting || isStockPortfolioDeleting}
						onClick={handleDeletePortfolio}
					>
						Usuń portfel
					</Button>
				</div>
			</div>
		</div>
	);
}
