'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../_redux/hooks';
import Spinner from '../_components/Spinner';

export default function GuestOnlyProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.replace('/');
		}
	}, [isLoading, isAuthenticated, router]);

	if (isLoading || isAuthenticated) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Spinner size='large' color='text-main' />
			</div>
		);
	}

	return <>{children}</>;
}
