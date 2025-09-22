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
import { formatDateForInput } from '@/app/_utils/formatDate';

interface BudgetManageTransactionModalProps {
	onCloseModal: () => void;
	budgetId: string;
	transaction?: Transaction;
}

export default function BudgetManageTransactionModal({
	onCloseModal,
	budgetId,
	transaction,
}: BudgetManageTransactionModalProps) {
	const {
		register,
		handleSubmit,
		setValue,
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
			transaction_date: formatDateForInput(
				transaction?.transaction_date ?? new Date()
			),
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
					transaction_date: data.transaction_date,
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
						error.meassege || 'Wystąpił błąd przy tworzeniu transakcji.'
					);
				});
		}

		if (transaction) {
			modifyTransaction({
				budgetId,
				transactionId: transaction.id,
				transaction: {
					title: data.title,
					transaction_date: data.transaction_date,
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
					toast.success('Zmodyfikowano transakcję.');
					onCloseModal();
				})
				.catch((error) => {
					toast.error(
						error.meassege || 'Wystąpił błąd przy modyfikacji transakcji.'
					);
				});
		}
	};

	return (
		<div>
			<ModalHeader
				title={transaction ? 'Modyfikacja transakcji' : 'Tworzenie transakcji'}
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
					required
					defaultValue={transaction?.category.name || 'Wybierz kategorię'}
					error={errors?.category?.message as string}
					setValue={setValue}
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
				<FormInput
					label='Data transakcji'
					register={register}
					name='transaction_date'
					error={errors?.transaction_date?.message as string}
					type='datetime-local'
					required
				/>

				<div className='flex justify-center pt-5'>
					<Button
						type='submit'
						isLoading={isTransactionCreating || isTransactionModifying}
					>
						{transaction ? 'Edytuj transakcję' : 'Dodaj transakcję'}
					</Button>
				</div>
			</form>
		</div>
	);
}
