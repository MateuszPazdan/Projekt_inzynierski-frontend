import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import Button from '../Button';
import FormTextarea from '../FormTextarea';
import ColorPicker from '../ColorPicker';
import FormCheckbox from '../FormCheckbox';

interface CreateBudgetModalProps {
	onCloseModal: () => void;
}

export default function CreateBudgetModal({
	onCloseModal,
}: CreateBudgetModalProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({ defaultValues: { color: '#17bebb' } });

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};

	return (
		<div>
			<ModalHeader title='Tworzenie budżetu' onCloseModal={onCloseModal} />
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
					required
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
					<Button type='submit'>Stwórz budżet</Button>
				</div>
			</form>
		</div>
	);
}
