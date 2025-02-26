'use client';

import Link from 'next/link';
import Button from '../Button';

export default function LoginForm() {
	return (
		<div className='flex flex-col lg:gap-5 lg:py-12 lg:px-10'>
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
			<div className='flex flex-col gap-5 pb-10'>
				<div className='flex flex-col'>
					<label htmlFor=''>E-mail</label>
					<input
						type='text'
						className='border-grayOne border-2 rounded-lg p-2'
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor=''>Hasło</label>
					<input
						type='text'
						className='border-grayOne border-2 rounded-lg p-2'
					/>
				</div>
			</div>
			<div className='flex justify-center'>
				<Button onClick={() => console.log('Logowanie')}>Zaloguj się</Button>
			</div>
		</div>
	);
}
