import ModalHeader from '../ModalHeader';
import Button from '../Button';
import {
	Budget,
	useDeleteBudgetMutation,
} from '@/app/_redux/features/budgetApiSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface BudgetDeleteModalProps {
	onCloseModal: () => void;
	budget: Budget;
}

export default function BudgetDeleteModal({
	onCloseModal,
	budget,
}: BudgetDeleteModalProps) {
	const [deleteBudget, { isLoading: isBudgetDeleting }] =
		useDeleteBudgetMutation();

	const router = useRouter();

	function handleDeleteBudget() {
		deleteBudget(budget)
			.unwrap()
			.then(() => {
				toast.success('Usunięto budżet.');
				onCloseModal();
				router.push('/app/budget');
			})
			.catch((error) => {
				toast.error(
					error?.data?.detail || 'Wystąpił błąd przy usuwaniu budżetu.'
				);
			});
	}

	return (
		<div>
			<ModalHeader title={'Usuwanie budżetu'} onCloseModal={onCloseModal} />
			<div className='gap-6 py-5'>
				<p className='text-gray-700 md:text-center md:flex flex-col md:mx-auto text-lg'>
					Na pewno chcesz usunąć budżet? Tego nie da się cofnąć.
				</p>
				<div className='flex justify-center pt-10'>
					<Button
						type='button'
						color='danger'
						isLoading={isBudgetDeleting}
						onClick={handleDeleteBudget}
					>
						Usuń budżet
					</Button>
				</div>
			</div>
		</div>
	);
}
