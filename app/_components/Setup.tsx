'use client';

import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import CustomProvider from '../_redux/Provider';
import { useEffect } from 'react';

interface SetupProps {
	children: React.ReactNode;
}

function Setup({ children }: SetupProps) {
	const { toasts } = useToasterStore();

	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= 3)
			.forEach((t) => toast.dismiss(t.id));
	}, [toasts]);
	return (
		<CustomProvider>
			<Toaster
				position='top-center'
				gutter={12}
				containerStyle={{ margin: '8px' }}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 3000,
					},
					style: {
						zIndex: 1000,
						fontSize: '16px',
						maxWidth: '500px',
						padding: '16px 24px',
					},
				}}
			/>
			{children}
		</CustomProvider>
	);
}

export default Setup;
