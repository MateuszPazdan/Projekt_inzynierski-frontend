import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import Button from '../Button';
import FormTextarea from '../FormTextarea';
import ColorPicker from '../ColorPicker';
import FormCheckbox from '../FormCheckbox';
import {
	Budget,
	useCreateBudgetMutation,
	useModifyBudgetMutation,
} from '@/app/_redux/features/budgetApiSlice';
import toast from 'react-hot-toast';

interface ManageBudgetModalProps {
	onCloseModal: () => void;
	budget?: Budget;
}

export default function ManageBudgetModal({
	onCloseModal,
	budget,
}: ManageBudgetModalProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			is_public: budget?.is_public ?? false,
			color: budget?.color ?? '#17bebb',
			description: budget?.description ?? '',
			title: budget?.title ?? '',
		},
	});
	const [createBudget, { isLoading: isBudgetCreating }] =
		useCreateBudgetMutation();
	const [modifyBudget, { isLoading: isBudgetModifying }] =
		useModifyBudgetMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (!budget) {
			createBudget({
				is_public: data.is_public === 'true',
				color: data.color,
				description: data.description,
				title: data.title,
			})
				.unwrap()
				.then(() => {
					toast.success('Utworzono nowy budżet.');
					onCloseModal();
				})
				.catch((error) => {
					toast.error(
						error.meassege || 'Wystąpił błąd przy tworzeniu budżetu.'
					);
				});
		}
		if (budget) {
			modifyBudget({
				budgetId: budget.id,
				budget: {
					is_public: data.is_public === 'true',
					color: data.color,
					description: data.description,
					title: data.title,
				},
			})
				.unwrap()
				.then(() => {
					toast.success('Edytowano budżet.');
					onCloseModal();
				})
				.catch((error) => {
					toast.error(
						error.meassege || 'Wystąpił błąd przy edycji budżetu.'
					);
				});
		}
	};

	return (
		<div>
			<ModalHeader
				title={`${budget ? 'Edycja budżetu' : 'Tworzenie budżetu'}`}
				onCloseModal={onCloseModal}
			/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 py-5'
			>
				<FormInput
					label='Tytuł budżetu'
					register={register}
					name='title'
					error={errors?.title?.message as string}
					type='text'
					required
					maxLength={64}
				/>
				<FormTextarea
					label='Opis budżetu (opcjonalny)'
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
							label: 'Budżet widoczny dla innych użytkowników Asset Flow',
							value: true,
						},
					]}
				/>

				<div className='flex justify-center pt-5'>
					<Button
						type='submit'
						isLoading={isBudgetCreating || isBudgetModifying}
					>
						{budget ? 'Edytuj budżet' : 'Stwórz budżet'}
					</Button>
				</div>
			</form>
		</div>
	);
}
