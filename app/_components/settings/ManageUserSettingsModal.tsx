import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from '../ModalHeader';
import FormInput from '../FormInput';
import Button from '../Button';
import {
	useModifyUserMutation,
	User,
} from '@/app/_redux/features/authApiSlice';
import toast from 'react-hot-toast';

interface ManageUserSettingsModalProps {
	onCloseModal: () => void;
	user?: User;
}

export default function ManageUserSettingsModal({
	onCloseModal,
	user,
}: ManageUserSettingsModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			username: user?.username || '',
		},
	});
	const [modifyUser, { isLoading: isLoadingModifyUser }] =
		useModifyUserMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		modifyUser({ username: data.username })
			.unwrap()
			.then(() => {
				toast.success('Zmieniono dane użytkownika.');
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error.meassege || 'Wystąpił błąd przy zmianie danych użytkownika.'
				);
			});
	};

	return (
		<div>
			<ModalHeader title='Edycja użytkownika' onCloseModal={onCloseModal} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 py-5'
			>
				<FormInput
					label='Nazwa użytkownika'
					register={register}
					name='username'
					error={errors?.username?.message as string}
					type='text'
					required
					maxLength={32}
				/>

				<div className='flex justify-center pt-5'>
					<Button type='submit' isLoading={isLoadingModifyUser}>
						Zmień dane
					</Button>
				</div>
			</form>
		</div>
	);
}
