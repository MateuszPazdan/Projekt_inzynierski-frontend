import { User } from '@/app/_redux/features/authApiSlice';
import UserInfo from './UserInfo';
import UserNavElement from './UserNavElement';
import { CiLogout, CiSettings } from 'react-icons/ci';
import { useLogout } from '@/app/_hook/useLogout';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useClickOutside } from '@/app/_hook/useClickOutside';

interface UserNavProps {
	user?: User;
	setIsAvatarClicked: (isOpen: boolean) => void;
}

export default function UserNav({ user, setIsAvatarClicked }: UserNavProps) {
	const { logoutHookFn } = useLogout();
	const navRef = useRef<HTMLDivElement>(null);

	const closeModal = () => {
		setIsAvatarClicked(false);
	};

	useClickOutside(navRef, closeModal);

	return (
		<motion.div
			ref={navRef}
			className='absolute top-16 right-0  bg-white shadow-md p-1 rounded-xl min-w-[250px] flex flex-col'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
		>
			<UserInfo
				email={user?.email}
				username={user?.username}
				imageUrl={user?.avatar_image}
			/>

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
		</motion.div>
	);
}
