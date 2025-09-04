import { useDeleteCryptoPortfolioMutation } from '@/app/_redux/features/portfiolioApiSlice';
import { useRouter } from 'next/navigation';
import ModalHeader from '../ModalHeader';
import Button from '../Button';
import toast from 'react-hot-toast';

interface DeletePortfolioModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	portfolioType: 'crypto' | 'stocks';
}

export default function DeletePortfolioModal({
	onCloseModal,
	portfolioId,
	portfolioType,
}: DeletePortfolioModalProps) {
	const [deleteCryptoPortfolio, { isLoading: isCryptoPortfolioDeleting }] =
		useDeleteCryptoPortfolioMutation();

	const router = useRouter();

	function handleDeletePortfolio() {
		if (portfolioType === 'crypto') {
			deleteCryptoPortfolio(portfolioId)
				.unwrap()
				.then(() => {
					toast.success('Usunięto portfolio.');
					onCloseModal();
					router.push('/app/invest/crypto');
				})
				.catch((error) => {
					toast.error(
						error?.data?.detail || 'Wystąpił błąd przy usuwaniu budżetu.'
					);
				});
		}
	}

	return (
		<div>
			<ModalHeader title={'Usuwanie portfolio'} onCloseModal={onCloseModal} />
			<div className='gap-6 py-5'>
				<p className='text-gray-700 md:text-center md:flex flex-col md:mx-auto text-lg'>
					Na pewno chcesz usunąć portfolio? Tego nie da się cofnąć.
				</p>
				<div className='flex justify-center pt-10'>
					<Button
						type='button'
						color='danger'
						isLoading={isCryptoPortfolioDeleting}
						onClick={handleDeletePortfolio}
					>
						Usuń portfolio
					</Button>
				</div>
			</div>
		</div>
	);
}
