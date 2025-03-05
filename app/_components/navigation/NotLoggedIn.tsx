import { useRouter } from 'next/navigation';
import Button from '../Button';

export default function NotLoggedIn() {
	const router = useRouter();
	return (
		<div className='flex flex-row gap-2'>
			<Button
				size='small'
				color='light'
				onClick={() => router.replace('/auth/login')}
			>
				Zaloguj się
			</Button>
			<Button size='small' onClick={() => router.replace('/auth/register')}>
				Zarejestruj się
			</Button>
		</div>
	);
}
