import ResetPasswordForm from '@/app/_components/auth/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resetowanie hasła | Asset Flow',
};

export default function page() {
	return (
		<div className='bg-white rounded-xl p-2 sm400:p-5 grid grid-cols-1  w-full sm:w-2/3 lg:w-auto'>
			<ResetPasswordForm />
		</div>
	);
}
