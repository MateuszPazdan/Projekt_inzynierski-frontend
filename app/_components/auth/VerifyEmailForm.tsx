'use client';

import { useVerifyEmailMutation } from '@/app/_redux/features/authApiSlice';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEmailForm({ token }: { token: string }) {
	const [verifyEmail] = useVerifyEmailMutation();
	const router = useRouter();

	useEffect(() => {
		verifyEmail({ token })
			.unwrap()
			.then(() => {
				toast.success(
					'Weryfikacja e-maila przebiegła pomyślnie. Możesz się zalogować.'
				);
				router.push('/auth/login');
			})
			.catch((err) => {
				toast.error(
					err?.data?.detail ?? 'Wystąpił błąd przy weryfikacji e-maila.'
				);
				router.push('/auth/login');
			});
	}, [token, verifyEmail, router]);

	return (
		<p className='flex flex-col gap-4'>
			<span>Trwa potwierdzanie konta...</span>
			<span>
				<Spinner size='medium' color='text-main' />
			</span>
		</p>
	);
}
