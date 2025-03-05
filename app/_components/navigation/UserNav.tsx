import { User } from '@/app/_redux/features/authApiSlice';
import UserInfo from './UserInfo';
import UserNavElement from './UserNavElement';
import { CiLogout, CiSettings } from 'react-icons/ci';
import { useLogout } from '@/app/_hook/useLogout';

export default function UserNav({ user }: { user: User | undefined }) {
	const { logoutHookFn } = useLogout();
	return (
		<div className='absolute top-16 right-0 bg-white shadow-md p-1 rounded-xl min-w-[250px] flex flex-col gap-2'>
			<UserInfo email={user?.email} username={user?.username} />
			{/* TODO add imageUrl */}
			<UserNavElement
				href='/settings'
				title='Ustawienia konta'
				icon={<CiSettings />}
			/>
			<UserNavElement
				onClick={() => logoutHookFn()}
				title='Wyloguj się'
				icon={<CiLogout />}
			/>
		</div>
	);
}
