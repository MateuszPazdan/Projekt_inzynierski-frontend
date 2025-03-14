'use client';

import Link from 'next/link';
import Button from '../Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import {
	validateEmail,
	validatePassword,
	validateRepeatPassword,
} from '@/app/_utils/isInputCorrect';
import { useRegisterMutation } from '@/app/_redux/features/authApiSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FieldValues>();
	const [register, { isLoading: isRegistering }] = useRegisterMutation();
	const router = useRouter();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		register({
			email: data.email,
			username: data.username,
			password: data.password,
		})
			.unwrap()
			.then(() => {
				toast.success(
					'Zarejestrowano pomyślnie. Sprawdź e-mail w celu potwierdzenia konta.'
				);
				router.push('/auth/login');
			})
			.catch((err) => {
				toast.error(err?.data?.detail ?? 'Wystąpił błąd przy tworzeniu konta.');
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col lg:gap-5 lg:py-12 lg:px-10'
		>
			<div className='pb-10'>
				<p className='text-3xl font-semibold pb-2'>Rejestracja</p>
				<p className='text-gray-800'>
					Masz już konto?{' '}
					<Link
						href={'/auth/login'}
						className='text-main hover:text-second transition-colors duration-300'
					>
						Zaloguj się
					</Link>
				</p>
			</div>
			<div className='flex flex-col gap-7 pb-10'>
				<FormInput
					label='Nazwa użytkownika'
					register={formRegister}
					name='username'
					error={errors?.username?.message as string}
					type='text'
					autoComplete='username'
					required
				/>
				<FormInput
					label='E-mail'
					register={formRegister}
					name='email'
					error={errors?.email?.message as string}
					type='email'
					autoComplete='email'
					required
					validateFunction={() => validateEmail(getValues()?.email)}
				/>
				<FormInput
					label='Hasło'
					register={formRegister}
					name='password'
					error={errors?.password?.message as string}
					type='password'
					autoComplete='new-password'
					required
					validateFunction={() => validatePassword(getValues()?.password)}
				/>
				<FormInput
					label='Powtórz hasło'
					register={formRegister}
					name='repeatPassword'
					error={errors?.repeatPassword?.message as string}
					type='password'
					autoComplete='new-password'
					required
					validateFunction={() =>
						validateRepeatPassword(
							getValues()?.password,
							getValues()?.repeatPassword
						)
					}
				/>
			</div>
			<div className='flex justify-center'>
				<Button type='submit' isLoading={isRegistering}>
					Zarejestruj się
				</Button>
			</div>
		</form>
	);
}
