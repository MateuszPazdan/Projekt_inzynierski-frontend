'use client';

import Link from 'next/link';
import Button from '../Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../FormInput';

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

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
					autoComplete='new-password'
				/>
			</div>
			<div className='flex justify-center'>
				<Button type='submit'>Zaloguj się</Button>
			</div>
		</form>
	);
}
