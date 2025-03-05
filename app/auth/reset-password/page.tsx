import ConfirmResetPassword from '@/app/_components/auth/ConfirmResetPassword';
import ResetPasswordForm from '@/app/_components/auth/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resetowanie hasła | Asset Flow',
};

type Params = { token: string };

interface Props {
	searchParams: Params;
}

export default function page({ searchParams }: Props) {
	const token = searchParams?.token;
	return (
		<div className='bg-white rounded-xl p-2 sm400:p-5 grid grid-cols-1  w-full sm:w-2/3 lg:w-auto'>
			{token ? <ConfirmResetPassword token={token} /> : <ResetPasswordForm />}
		</div>
	);
}
