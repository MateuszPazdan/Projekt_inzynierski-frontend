import RegisterForm from '@/app/_components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Rejestracja | Asset Flow',
	description:
		'Zarejestruj się i poznaj pełne możliwości aplikacji do kontroli finansów',
};

export default function page() {
	return (
		<div className='min-h-screen flex justify-center lg:items-center pt-12 lg:bg-grayOne'>
			<div className='bg-white rounded-xl p-2 sm400:p-5 lg:p-2 grid grid-cols-1 lg:grid-cols-[2fr_3fr] w-full sm:w-2/3 lg:w-auto'>
				<div className='hidden lg:flex flex-col justify-between text-white bg-main rounded-lg lg:px-10 lg:py-12 max-w-[300px]'>
					<div>
						<p className='text-3xl font-medium text-pretty pb-5'>
							Zacznij śledzić swoje finanse.
						</p>
						<p className='text-lg font-light'>
							Monitoruj wydatki, planuj budżet i inwestuj mądrze – wszystko w
							czasie rzeczywistym.
						</p>
					</div>
					<p className='font-bold'>Asset Flow</p>
				</div>
				<RegisterForm />
			</div>
		</div>
	);
}
