import {
	PortfolioInfo,
	useCreateCryptoPortfolioMutation,
	useCreateStockPortfolioMutation,
	useModifyCryptoPortfolioMutation,
} from '@/app/_redux/features/portfiolioApiSlice';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import ColorPicker from '../ColorPicker';
import FormCheckbox from '../FormCheckbox';
import Button from '../Button';

interface ManagePortfolioModalProps {
	onCloseModal: () => void;
	portfolio?: PortfolioInfo;
	assetType: 'crypto' | 'stocks';
}

export default function ManagePortfolioModal({
	onCloseModal,
	portfolio,
	assetType,
}: ManagePortfolioModalProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			is_public: portfolio?.is_public ?? false,
			color: portfolio?.color ?? '#17bebb',
			description: portfolio?.description ?? '',
			title: portfolio?.title ?? '',
		},
	});

	const [createCryptoPortfolio, { isLoading: isCryptoPortfolioCreating }] =
		useCreateCryptoPortfolioMutation();
	const [modifyCryptoPortfolio, { isLoading: isCryptoPortfolioModifying }] =
		useModifyCryptoPortfolioMutation();
	const [createStockPortfolio, { isLoading: isStockPortfolioCreating }] =
		useCreateStockPortfolioMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (assetType === 'crypto') {
			if (!portfolio) {
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
			if (portfolio) {
				modifyCryptoPortfolio({
					portfolioId: portfolio.id,
					portfolio: {
						is_public: data.is_public === 'true',
						color: data.color,
						description: data.description,
						title: data.title,
					},
				})
					.unwrap()
					.then(() => {
						toast.success('Zmodyfikowano portfolio.');
						onCloseModal();
					})
					.catch((error) => {
						toast.error(
							error.meassege || 'Wystąpił błąd przy modyfikacji portfolio.'
						);
					});
			}
		}
		if (assetType === 'stocks') {
			if (!portfolio) {
				createStockPortfolio({
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
			//  TODO implement stocks portfolio management
		}
	};

	return (
		<div>
			<ModalHeader
				title={`${portfolio ? 'Mofyfikacja portfolio' : 'Tworzenie portfolio'}`}
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
					<Button
						type='submit'
						isLoading={
							isCryptoPortfolioCreating ||
							isCryptoPortfolioModifying ||
							isStockPortfolioCreating
						}
					>
						{portfolio ? 'Modyfikuj portfolio' : 'Stwórz portfolio'}
					</Button>
				</div>
			</form>
		</div>
	);
}
