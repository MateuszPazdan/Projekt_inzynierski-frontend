import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import Button from '../Button';
import toast from 'react-hot-toast';
import {
	validatePassword,
	validateRepeatPassword,
} from '@/app/_utils/isInputCorrect';
import { useChangePasswordMutation } from '@/app/_redux/features/authApiSlice';

interface ChangePasswordModalProps {
	onCloseModal: () => void;
}

export default function ChangePasswordModal({
	onCloseModal,
}: ChangePasswordModalProps) {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FieldValues>();
	const [changePassword, { isLoading: isChangingPassword }] =
		useChangePasswordMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		changePassword({ password: data.password, new_password: data.new_password })
			.unwrap()
			.then(() => {
				toast.success('Hasło zostało zmienione.');
				onCloseModal();
			})
			.catch((error) => {
				toast.error(error.data.detail || 'Wystąpił błąd przy zmianie hasła.');
				onCloseModal();
			});
	};

	return (
		<div>
			<ModalHeader title='Zmiana hasła' onCloseModal={onCloseModal} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 py-5'
			>
				<FormInput
					label='Stare hasło'
					register={register}
					name='password'
					error={errors?.password?.message as string}
					type='password'
					required
				/>
				<FormInput
					label='Nowe hasło'
					register={register}
					name='new_password'
					error={errors?.new_password?.message as string}
					type='password'
					required
					validateFunction={() => validatePassword(getValues()?.new_password)}
				/>
				<FormInput
					label='Powtórz nowe hasło'
					register={register}
					name='repeat_new_password'
					error={errors?.repeat_new_password?.message as string}
					type='password'
					required
					validateFunction={() =>
						validateRepeatPassword(
							getValues()?.new_password,
							getValues()?.repeat_new_password
						)
					}
				/>

				<div className='flex justify-center pt-5'>
					<Button type='submit' isLoading={isChangingPassword}>
						Zmień hasło
					</Button>
				</div>
			</form>
		</div>
	);
}
