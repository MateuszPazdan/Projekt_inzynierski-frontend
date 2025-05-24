import { useRouter } from 'next/navigation';
import Button from '../Button';

interface Props {
	size?: 'small' | 'large';
	stretchButtons?: boolean;
	additionalFuntcion?: () => void;
}

export default function NotLoggedIn({
	size = 'small',
	stretchButtons,
	additionalFuntcion,
}: Props) {
	const router = useRouter();
	return (
		<div className='flex flex-row gap-2 w-full flex-wrap'>
			<Button
				size={size}
				color='light'
				onClick={() => {
					if (additionalFuntcion) additionalFuntcion();
					router.replace('/auth/login');
				}}
				stretch={stretchButtons}
			>
				Zaloguj się
			</Button>
			<Button
				size={size}
				onClick={() => {
					if (additionalFuntcion) additionalFuntcion();
					router.replace('/auth/register');
				}}
				stretch={stretchButtons}
			>
				Zarejestruj się
			</Button>
		</div>
	);
}
