import VerifyEmailForm from '@/app/_components/auth/VerifyEmailForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Potwierdzanie e-maila | Asset Flow',
};

type Params = { token: string };

interface Props {
	searchParams: Params;
}

export default function page({ searchParams }: Props) {
	const token = searchParams?.token;

	return (
		<div className='min-h-screen flex justify-center items-center'>
			<VerifyEmailForm token={token} />
		</div>
	);
}
