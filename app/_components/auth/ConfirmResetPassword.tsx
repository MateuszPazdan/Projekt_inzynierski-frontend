'use client';

import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaFingerprint, FaLock } from 'react-icons/fa';
import FormInput from '../FormInput';
import Button from '../Button';
import {
	validatePassword,
	validateRepeatPassword,
} from '@/app/_utils/isInputCorrect';

export default function ConfirmResetPassword({ token }: { token: string }) {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FieldValues>();
	const router = useRouter();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		// resetPassword({
		// 	email: data.email,
		// })
		// 	.unwrap()
		// 	.then(() => {
		// 		toast.success(
		// 			'Jeśli e-mail jest poprawny, wysłaliśmy Ci instrukcje resetowania hasła. Sprawdź swoją skrzynkę.',
		// 			{ duration: 5000 }
		// 		);
		// 		router.replace('/auth/login');
		// 	})
		// 	.catch(() => {
		// 		toast.error(
		// 			'Coś poszło nie tak! Upewnij się, że podany e-mail jest poprawny lub spróbuj ponownie za chwilę.'
		// 		);
		// 	});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col lg:gap-5 lg:py-12 lg:px-10'
		>
			<div className='pb-10'>
				<p className='flex justify-center pb-4 text-4xl'>
					<span className='text-main p-3  rounded-lg'>
						<FaLock />
					</span>
				</p>
				<p className='text-3xl text-center font-semibold pb-2'>
					Ustaw nowe hasło
				</p>
				<p className='text-center text-md'>
					Wprowadź nowe hasło, aby odzyskać dostęp do swojego konta.
				</p>
			</div>
			<div className='flex flex-col gap-7 pb-10'>
				<FormInput
					label='Nowe hasło'
					register={register}
					name='newPassword'
					error={errors?.newPassword?.message as string}
					type='password'
					autoComplete='new-password'
					validateFunction={() => validatePassword(getValues().password)}
				/>
				<FormInput
					label='Powtórz nowe hasło'
					register={register}
					name='repeatPassword'
					error={errors?.repeatPassword?.message as string}
					type='password'
					autoComplete='new-password'
					validateFunction={() =>
						validateRepeatPassword(
							getValues().newPassword,
							getValues().repeatPassword
						)
					}
				/>
			</div>
			<div className='flex justify-center'>
				<Button type='submit'>Resetuj hasło</Button>
			</div>
		</form>
	);
}
