'use client';

import Link from 'next/link';
import Button from '../Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import { useLoginMutation } from '@/app/_redux/features/authApiSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();
	const [login] = useLoginMutation();
	const router = useRouter();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		login({
			email: data.email,
			password: data.password,
		})
			.unwrap()
			.then(() => {
				toast.success('Zalogowano pomyślnie.');
				router.push('/');
			})
			.catch((err) => {
				toast.error(err?.data?.detail ?? 'Wystąpił błąd przy logowaniu.');
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col lg:gap-5 lg:py-12 lg:px-10'
		>
			<div className='pb-10'>
				<p className='text-3xl font-semibold pb-2'>Logowanie</p>
				<p className='text-gray-800'>
					Nie masz konta?{' '}
					<Link
						href={'/auth/register'}
						className='text-main hover:text-second transition-colors duration-300'
					>
						Zarejestruj się
					</Link>
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
				<FormInput
					label='Hasło'
					register={register}
					name='password'
					error={errors?.password?.message as string}
					type='password'
					autoComplete='current-password'
				/>
			</div>
			<div className='flex justify-center'>
				<Button type='submit'>Zaloguj się</Button>
			</div>
		</form>
	);
}
