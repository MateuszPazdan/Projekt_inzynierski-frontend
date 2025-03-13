import { useRouter } from 'next/navigation';
import Button from '../Button';

interface Props {
	size?: 'small' | 'large';
	stretchButtons?: boolean;
}

export default function NotLoggedIn({ size = 'small', stretchButtons }: Props) {
	const router = useRouter();
	return (
		<div className='flex flex-row gap-2 w-full flex-wrap'>
			<Button
				size={size}
				color='light'
				onClick={() => router.replace('/auth/login')}
				stretch={stretchButtons}
			>
				Zaloguj się
			</Button>
			<Button
				size={size}
				onClick={() => router.replace('/auth/register')}
				stretch={stretchButtons}
			>
				Zarejestruj się
			</Button>
		</div>
	);
}
