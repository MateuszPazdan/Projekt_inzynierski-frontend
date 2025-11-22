import {
	PortfolioCryptoTransaction,
	PortfolioStockTransaction,
	useCreateCryptoPortfolioTransactionMutation,
	useCreateStockPortfolioTransactionMutation,
	useUpdateCryptoPortfolioTransactionMutation,
	useUpdateStockPortfolioTransactionMutation,
} from '@/app/_redux/features/portfiolioApiSlice';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import FormTextarea from '../FormTextarea';
import ModalHeader from '../ModalHeader';
import toast from 'react-hot-toast';
import { formatDateForInput } from '@/app/_utils/formatDate';

interface ManagePortfolioTransactionModalProps {
	onCloseModal: () => void;
	portfolioId: string;
	cryptoSymbol?: string;
	transaction?: PortfolioCryptoTransaction | PortfolioStockTransaction;
	assetType: 'stocks' | 'crypto';
}

export default function ManagePortfolioTransactionModal({
	onCloseModal,
	portfolioId,
	cryptoSymbol,
	transaction,
	assetType,
}: ManagePortfolioTransactionModalProps) {
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
		},
	});
	const [
		createCryptoPortfolioTransaction,
		{ isLoading: isCreateCryptoPortfolioTransactionLoading },
	] = useCreateCryptoPortfolioTransactionMutation();
	const [
		updateCryptoPortfolioTransaction,
		{ isLoading: isUpdateCryptoPortfolioTransactionLoading },
	] = useUpdateCryptoPortfolioTransactionMutation();
	const [
		createStockPortfolioTransaction,
		{ isLoading: isCreateStockPortfolioTransactionLoading },
	] = useCreateStockPortfolioTransactionMutation();
	const [
		updateStockPortfolioTransaction,
		{ isLoading: isUpdateStockPortfolioTransactionLoading },
	] = useUpdateStockPortfolioTransactionMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const date = new Date(data.transaction_date);
		const isoDate = date.toISOString();

		if (assetType === 'crypto') {
			if (!transaction) {
				createCryptoPortfolioTransaction({
					portfolio_id: portfolioId,
					transaction: {
						amount: data.amount,
						crypto: { symbol: data.symbol.toLowerCase() },
						description: data.description,
						price_per_unit: data.price_per_unit,
						transaction_date: isoDate,
						transaction_type:
							data.transaction_type === 'Kup'
								? 'buy'
								: data.transaction_type === 'Sprzedaj'
								? 'sell'
								: data.transaction_type,
					},
				})
					.unwrap()
					.then(() => {
						toast.success('Utworzono nową transakcję.');
						onCloseModal();
					})
					.catch((error) => {
						toast.error(
							error.data.detail || 'Wystąpił błąd przy tworzeniu transakcji.'
						);
					});
			}

			if (transaction) {
				updateCryptoPortfolioTransaction({
					portfolio_id: portfolioId,
					transaction_id: transaction.id,
					transaction: {
						amount: data.amount,
						crypto: { symbol: data.symbol.toLowerCase() },
						description: data.description,
						price_per_unit: data.price_per_unit,
						transaction_date: isoDate,
						transaction_type:
							data.transaction_type === 'Kup'
								? 'buy'
								: data.transaction_type === 'Sprzedaj'
								? 'sell'
								: data.transaction_type,
					},
				})
					.unwrap()
					.then(() => {
						toast.success('Utworzono nową transakcję.');
						onCloseModal();
					})
					.catch((error) => {
						toast.error(
							error.data.detail || 'Wystąpił błąd przy tworzeniu transakcji.'
						);
					});
			}
		}
		if (assetType === 'stocks') {
			if (!transaction) {
				createStockPortfolioTransaction({
					portfolio_id: portfolioId,
					transaction: {
						amount: data.amount,
						stock: { symbol: data.symbol.toUpperCase() },
						description: data.description,
						price_per_unit: data.price_per_unit,
						transaction_date: isoDate,
						transaction_type:
							data.transaction_type === 'Kup'
								? 'buy'
								: data.transaction_type === 'Sprzedaj'
								? 'sell'
								: data.transaction_type,
					},
				})
					.unwrap()
					.then(() => {
						toast.success('Utworzono nową transakcję.');
						onCloseModal();
					})
					.catch((error) => {
						toast.error(
							error.data.detail || 'Wystąpił błąd przy tworzeniu transakcji.'
						);
					});
			}
			if (transaction) {
				updateStockPortfolioTransaction({
					portfolio_id: portfolioId,
					transaction_id: transaction.id,
					transaction: {
						amount: data.amount,
						stock: { symbol: data.symbol.toUpperCase() },
						description: data.description,
						price_per_unit: data.price_per_unit,
						transaction_date: isoDate,
						transaction_type:
							data.transaction_type === 'Kup'
								? 'buy'
								: data.transaction_type === 'Sprzedaj'
								? 'sell'
								: data.transaction_type,
					},
				})
					.unwrap()
					.then(() => {
						toast.success('Utworzono nową transakcję.');
						onCloseModal();
					})
					.catch((error) => {
						toast.error(
							error.data.detail || 'Wystąpił błąd przy tworzeniu transakcji.'
						);
					});
			}
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
					name='symbol'
					register={register}
					defaultValue={
						(transaction &&
							'crypto' in transaction &&
							transaction?.crypto.symbol.toUpperCase()) ||
						(transaction &&
							'stock' in transaction &&
							transaction?.stock.symbol.toUpperCase()) ||
						cryptoSymbol?.toUpperCase()
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
						isLoading={
							isCreateCryptoPortfolioTransactionLoading ||
							isUpdateCryptoPortfolioTransactionLoading ||
							isCreateStockPortfolioTransactionLoading ||
							isUpdateStockPortfolioTransactionLoading
						}
					>
						{transaction ? 'Edytuj transakcję' : 'Dodaj transakcję'}
					</Button>
				</div>
			</form>
		</div>
	);
}
