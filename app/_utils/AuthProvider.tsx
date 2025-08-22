'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../_redux/hooks';
import Spinner from '../_components/Spinner';
import toast from 'react-hot-toast';

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			toast.error(
				'Zaloguj się, aby skorzystać ze wszystkich funkcjonalności aplikacji Asset Flow.'
			);
			router.replace('/auth/login');
		}
	}, [isLoading, isAuthenticated, router]);

	if (isLoading || !isAuthenticated) {
		return (
			<div className='min-h-full flex-1 flex items-center justify-center'>
				<Spinner size='large' color='text-main' />
			</div>
		);
	}

	return <>{children}</>;
}
