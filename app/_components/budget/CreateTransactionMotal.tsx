import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import Button from '../Button';
import FormTextarea from '../FormTextarea';
import FormSelect from '../FormSelect';
import {
	useCreateTransactionMutation,
	useRetrieveTransactionCategoriesQuery,
} from '@/app/_redux/features/budgetApiSlice';
import toast from 'react-hot-toast';

interface CreateBudgetModalProps {
	onCloseModal: () => void;
	budgetId: string;
}

export default function CreateTransactionModal({
	onCloseModal,
	budgetId,
}: CreateBudgetModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();
	const [createTransaction, { isLoading: isTransactionCreating }] =
		useCreateTransactionMutation();
	const { data: transactionCategories } = useRetrieveTransactionCategoriesQuery(
		{}
	);
	const list =
		transactionCategories?.items?.map((category) => category.name) || [];

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		createTransaction({
			budgetId,
			transaction: {
				title: data.title,
				transaction_type: parseFloat(data.value) < 0 ? '-' : '+',
				amount: Math.abs(parseFloat(data.value)),
				description: data.description || '',
				category_id:
					transactionCategories?.items.find(
						(category) => category.name === data.category
					)?.id || 0,
			},
		})
			.unwrap()
			.then(() => {
				toast.success('Utworzono nową trabsakcję.');
				onCloseModal();
			})
			.catch((error) => {
				toast.error(error.meassege || 'Wystąpił błąd przy tworzeniu budżetu.');
			});
	};

	return (
		<div>
			<ModalHeader title='Tworzenie transakcji' onCloseModal={onCloseModal} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 py-5'
			>
				<FormInput
					label='Tytuł transakcji'
					register={register}
					name='title'
					error={errors?.title?.message as string}
					type='text'
					required
					maxLength={64}
				/>
				<FormSelect
					label='Kategoria transakcji'
					name='category'
					options={list}
					register={register}
					error={errors?.category?.message as string}
					required
					defaultValue='Wybierz kategorię'
				/>
				<FormInput
					label='Kwota transakcji'
					register={register}
					name='value'
					error={errors?.value?.message as string}
					type='number'
					required
					step={0.01}
				/>
				<FormTextarea
					label='Opis budżetu (opcjonalny)'
					register={register}
					name='description'
					error={errors?.description?.message as string}
					maxLength={255}
				/>

				<div className='flex justify-center pt-5'>
					<Button type='submit' isLoading={isTransactionCreating}>
						Stwórz budżet
					</Button>
				</div>
			</form>
		</div>
	);
}
