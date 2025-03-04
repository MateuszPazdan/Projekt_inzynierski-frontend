'use client';

import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import Button from '../Button';
import { FaFingerprint } from 'react-icons/fa';
import { useResetPasswordMutation } from '@/app/_redux/features/authApiSlice';
import toast from 'react-hot-toast';

export default function ResetPasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();
	const router = useRouter();
	const [resetPassword] = useResetPasswordMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		resetPassword({
			email: data.email,
		})
			.unwrap()
			.then(() => {
				toast.success(
					'Jeśli e-mail jest poprawny, wysłaliśmy Ci instrukcje resetowania hasła. Sprawdź swoją skrzynkę.',
					{ duration: 5000 }
				);
				router.replace('/auth/login');
			})
			.catch(() => {
				toast.error(
					'Coś poszło nie tak! Upewnij się, że podany e-mail jest poprawny lub spróbuj ponownie za chwilę.'
				);
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col lg:gap-5 lg:py-12 lg:px-10'
		>
			<div className='pb-10'>
				<p className='flex justify-center pb-4 text-4xl'>
					<span className='text-main p-3  rounded-lg'>
						<FaFingerprint />
					</span>
				</p>
				<p className='text-3xl text-center font-semibold pb-2'>
					Resetowanie hasła
				</p>
				<p className='text-center text-md'>
					Wyślemy na podany e-mail instrukcje dotyczące sposobu resetowania
					hasła.
				</p>
			</div>
			<div className='flex flex-col gap-7 pb-10'>
				<FormInput
					label='E-mail'
					register={register}
					name='email'
					error={errors?.email?.message as string}
					type='email'
					autoComplete='email'
				/>
			</div>
			<div className='flex justify-center'>
				<Button type='submit'>Resetuj hasło</Button>
			</div>
		</form>
	);
}
