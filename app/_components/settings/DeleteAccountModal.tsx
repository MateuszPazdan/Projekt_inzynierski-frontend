import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import Button from '../Button';
import toast from 'react-hot-toast';
import { useDeleteUserMutation } from '@/app/_redux/features/authApiSlice';
import { useLogout } from '@/app/_hook/useLogout';

interface DeleteAccountModalProps {
	onCloseModal: () => void;
}

export default function DeleteAccountModal({
	onCloseModal,
}: DeleteAccountModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();
	const [deleteUser, { isLoading: isLoadingDeleteUser }] =
		useDeleteUserMutation();
	const { logoutHookFn } = useLogout();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		deleteUser({ password: data.password })
			.unwrap()
			.then(() => {
				logoutHookFn();
				toast.success('Konto zostało usunięte.');
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error?.data?.detail || 'Wystąpił błąd przy usuwaniu konta.'
				);
				onCloseModal();
			});
	};

	return (
		<div>
			<ModalHeader title='Usuwanie konta' onCloseModal={onCloseModal} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 py-5'
			>
				<FormInput
					label='Hasło'
					register={register}
					name='password'
					error={errors?.password?.message as string}
					type='password'
					required
					autoComplete='off'
				/>

				<div className='flex justify-center pt-5'>
					<Button type='submit' color='danger' isLoading={isLoadingDeleteUser}>
						Usuń konto
					</Button>
				</div>
			</form>
		</div>
	);
}
