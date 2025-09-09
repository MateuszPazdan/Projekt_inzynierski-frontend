import { PortfolioCryptoTransaction } from '@/app/_redux/features/portfiolioApiSlice';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import FormTextarea from '../FormTextarea';
import ModalHeader from '../ModalHeader';

interface ManagePortfolioTransactionModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	cryptoSymbol: string;
	transaction?: PortfolioCryptoTransaction;
}

export default function ManagePortfolioTransactionModal({
	onCloseModal,
	portfolioId,
	cryptoSymbol,
	transaction,
}: ManagePortfolioTransactionModalProps) {
	const formatDateForInput = (date: Date | string) => {
		const dateObj = new Date(date);
		return dateObj.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
	};
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			amount: transaction?.amount,
			price_per_unit: transaction?.price_per_unit,
			transaction_date: formatDateForInput(
				transaction?.transaction_date ?? new Date()
			),
			description: transaction?.description,
			crypto_symbol: transaction?.crypto.symbol || cryptoSymbol,
			transaction_type: transaction?.transaction_type,
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
		if (!transaction) {
			// createTransaction({
			// 	budgetId,
			// 	transaction: {
			// 		title: data.title,
			// 		transaction_type: parseFloat(data.value) < 0 ? '-' : '+',
			// 		amount: Math.abs(parseFloat(data.value)),
			// 		description: data.description || '',
			// 		category_id:
			// 			transactionCategories?.items.find(
			// 				(category) => category.name === data.category
			// 			)?.id || 0,
			// 	},
			// })
			// 	.unwrap()
			// 	.then(() => {
			// 		toast.success('Utworzono nową transakcję.');
			// 		onCloseModal();
			// 	})
			// 	.catch((error) => {
			// 		toast.error(
			// 			error.meassege || 'Wystąpił błąd przy tworzeniu transakcji.'
			// 		);
			// 	});
		}

		if (transaction) {
			// modifyTransaction({
			// 	budgetId,
			// 	transactionId: transaction.id,
			// 	transaction: {
			// 		title: data.title,
			// 		transaction_type: parseFloat(data.value) < 0 ? '-' : '+',
			// 		amount: Math.abs(parseFloat(data.value)),
			// 		description: data.description || '',
			// 		category_id:
			// 			transactionCategories?.items.find(
			// 				(category) => category.name === data.category
			// 			)?.id || 0,
			// 	},
			// })
			// 	.unwrap()
			// 	.then(() => {
			// 		toast.success('Zmodyfikowano transakcję.');
			// 		onCloseModal();
			// 	})
			// 	.catch((error) => {
			// 		toast.error(
			// 			error.meassege || 'Wystąpił błąd przy modyfikacji transakcji.'
			// 		);
			// 	});
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
				<FormSelect
					label='Rodzaj transakcji'
					name='transaction_type'
					options={['Kup', 'Sprzedaj']}
					register={register}
					required
					defaultValue={
						transaction?.transaction_type === 'buy'
							? 'Kup'
							: transaction?.transaction_type === 'sell'
							? 'Sprzedaj'
							: ''
					}
					error={errors?.transaction_type?.message as string}
					setValue={setValue}
				/>
				<FormSelect
					label='Aktywo'
					name='crypto_symbol'
					register={register}
					defaultValue={
						transaction?.crypto.symbol.toUpperCase() ||
						cryptoSymbol.toUpperCase()
					}
					error={errors?.crypto_symbol?.message as string}
					setValue={setValue}
					disabled
				/>
				<FormInput
					label='Ilość'
					register={register}
					name='amount'
					error={errors?.amount?.message as string}
					type='number'
					required
					step={0.000001}
				/>
				<FormInput
					label='Cena za aktywo'
					register={register}
					name='price_per_unit'
					error={errors?.price_per_unit?.message as string}
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
						// isLoading={isTransactionCreating || isTransactionModifying}
					>
						{transaction ? 'Edytuj transakcję' : 'Dodaj transakcję'}
					</Button>
				</div>
			</form>
		</div>
	);
}
