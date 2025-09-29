import { useLogout } from '@/app/_hook/useLogout';
import { useRetrieveUserQuery } from '@/app/_redux/features/authApiSlice';
import { useState } from 'react';
import { CiLogout, CiSettings } from 'react-icons/ci';
import { FaCoins } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu';
import Spinner from '../Spinner';
import UserImage from './UserImage';
import UserInfo from './UserInfo';
import UserNavElement from './UserNavElement';
import InvestDropdownMenu from './InvestDropdownMenu';

export default function LoggedIn() {
	const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
	const [isAvatarClicked, setIsAvatarClicked] = useState(false);

	const { data: user, isLoading } = useRetrieveUserQuery();
	const { logoutHookFn } = useLogout();

	return (
		<div className='relative flex flex-row items-center gap-5'>
			{isLoading ? (
				<Spinner size='small' />
			) : (
				<>
					<DropdownMenu
						customOpenIcon={
							<div className='flex items-center justify-center gap-2 p-2 px-0 text-gray-600 hover:text-second transition-colors duration-300'>
								<FaCoins className='text-base' />
								<span className='text-sm'>Inwestycje</span>
							</div>
						}
						distanceFromTop={160}
						isExtended={isDropdownMenuOpen}
						setIsExtended={setIsDropdownMenuOpen}
					>
						<InvestDropdownMenu />
					</DropdownMenu>
					<DropdownMenu
						customOpenIcon={
							<div
								className={`relative w-10 h-10 rounded-full transition-all duration-300 overflow-hidden ${
									isAvatarClicked ? 'ring-main' : 'ring-transparent'
								} ring-2 ring-offset-2 hover:ring-main cursor-pointer`}
							>
								<UserImage
									imageAlt={`Awatar ${user?.username}`}
									imageUrl={user?.avatar_image}
								/>
							</div>
						}
						distanceFromTop={150}
						isExtended={isAvatarClicked}
						setIsExtended={setIsAvatarClicked}
					>
						<div className='min-w-[250px]'>
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
						</div>
					</DropdownMenu>
				</>
			)}
		</div>
	);
}
