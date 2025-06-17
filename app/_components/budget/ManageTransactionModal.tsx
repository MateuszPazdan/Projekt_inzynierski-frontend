import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import Button from '../Button';
import FormTextarea from '../FormTextarea';
import FormSelect from '../FormSelect';
import {
	Transaction,
	useCreateTransactionMutation,
	useModifyTransactionMutation,
	useRetrieveTransactionCategoriesQuery,
} from '@/app/_redux/features/budgetApiSlice';
import toast from 'react-hot-toast';

interface ManageTransactionModalProps {
	onCloseModal: () => void;
	budgetId: string;
	transaction?: Transaction;
}

export default function ManageTransactionModal({
	onCloseModal,
	budgetId,
	transaction,
}: ManageTransactionModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			title: transaction?.title,
			category: transaction?.category.name,
			value:
				transaction?.transaction_type === '+'
					? transaction?.amount
					: -Number(transaction?.amount),
			description: transaction?.description,
		},
	});
	const [createTransaction, { isLoading: isTransactionCreating }] =
		useCreateTransactionMutation();
	const [modifyTransaction, { isLoading: isTransactionModifying }] =
		useModifyTransactionMutation();
	const { data: transactionCategories } = useRetrieveTransactionCategoriesQuery(
		{}
	);
	const list =
		transactionCategories?.items?.map((category) => category.name) || [];

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (!transaction) {
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
					toast.success('Utworzono nową transakcję.');
					onCloseModal();
				})
				.catch((error) => {
					toast.error(
						error.meassege || 'Wystąpił błąd przy tworzeniu budżetu.'
					);
				});
		}
		if (transaction) {
			modifyTransaction({
				budgetId,
				transactionId: transaction.id,
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
					toast.success('Edytowano transakcję.');
					onCloseModal();
				})
				.catch((error) => {
					toast.error(
						error.meassege || 'Wystąpił błąd przy edytowaniu transakcji.'
					);
				});
		}
	};

	return (
		<div>
			<ModalHeader
				title={transaction ? 'Edycja transakcji' : 'Tworzenie transakcji'}
				onCloseModal={onCloseModal}
			/>
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
					label='Opis transakcji (opcjonalny)'
					register={register}
					name='description'
					error={errors?.description?.message as string}
					maxLength={255}
				/>

				<div className='flex justify-center pt-5'>
					<Button
						type='submit'
						isLoading={isTransactionCreating || isTransactionModifying}
					>
						{transaction ? 'Edytuj budżet' : 'Stwórz budżet'}
					</Button>
				</div>
			</form>
		</div>
	);
}
