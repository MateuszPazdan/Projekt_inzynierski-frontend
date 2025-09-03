import {
	PortfolioInfo,
	useCreateCryptoPortfolioMutation,
} from '@/app/_redux/features/portfiolioApiSlice';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ModalHeader from '../../ModalHeader';
import FormInput from '../../FormInput';
import FormTextarea from '../../FormTextarea';
import ColorPicker from '../../ColorPicker';
import FormCheckbox from '../../FormCheckbox';
import Button from '../../Button';

interface ManageCryptoPortfolioModalProps {
	onCloseModal: () => void;
	cryptoPortfolio?: PortfolioInfo;
}

export default function ManageCryptoPortfolioModal({
	onCloseModal,
	cryptoPortfolio,
}: ManageCryptoPortfolioModalProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			is_public: cryptoPortfolio?.is_public ?? false,
			color: cryptoPortfolio?.color ?? '#17bebb',
			description: cryptoPortfolio?.description ?? '',
			title: cryptoPortfolio?.title ?? '',
		},
	});

	const [createCryptoPortfolio, { isLoading: isCryptoPortfolioCreating }] =
		useCreateCryptoPortfolioMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (!cryptoPortfolio) {
			createCryptoPortfolio({
				is_public: data.is_public === 'true',
				color: data.color,
				description: data.description,
				title: data.title,
			})
				.unwrap()
				.then(() => {
					toast.success('Utworzono nowe portfolio.');
					onCloseModal();
				})
				.catch((error) => {
					toast.error(
						error.meassege || 'Wystąpił błąd przy tworzeniu portfolio.'
					);
				});
		}
		if (cryptoPortfolio) {
			// 	modifyBudget({
			// 		budgetId: budget.id,
			// 		budget: {
			// 			is_public: data.is_public === 'true',
			// 			color: data.color,
			// 			description: data.description,
			// 			title: data.title,
			// 		},
			// 	})
			// 		.unwrap()
			// 		.then(() => {
			// 			toast.success('Edytowano budżet.');
			// 			onCloseModal();
			// 		})
			// 		.catch((error) => {
			// 			toast.error(error.meassege || 'Wystąpił błąd przy edycji budżetu.');
			// 		});
		}
	};

	return (
		<div>
			<ModalHeader
				title={`${
					cryptoPortfolio ? 'Mofyfikacja portfolio' : 'Tworzenie portfolio'
				}`}
				onCloseModal={onCloseModal}
			/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 py-5'
			>
				<FormInput
					label='Tytuł portfolio'
					register={register}
					name='title'
					error={errors?.title?.message as string}
					type='text'
					required
					maxLength={64}
				/>
				<FormTextarea
					label='Opis portfolio (opcjonalny)'
					register={register}
					name='description'
					error={errors?.description?.message as string}
					maxLength={255}
				/>
				<ColorPicker
					name='color'
					register={register}
					colors={['#17bebb', '#ffc914', '#2e282a', '#76b041', '#e4572e']}
					selectedColor={watch('color')}
				/>
				<FormCheckbox
					register={register}
					name='is_public'
					options={[
						{
							label: 'Portfolio widoczne dla innych użytkowników Asset Flow',
							value: true,
						},
					]}
				/>

				<div className='flex justify-center pt-5'>
					<Button type='submit' isLoading={isCryptoPortfolioCreating}>
						{cryptoPortfolio ? 'Modyfikuj portfolio' : 'Stwórz portfolio'}
					</Button>
				</div>
			</form>
		</div>
	);
}
