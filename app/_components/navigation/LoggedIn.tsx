import { useRetrieveUserQuery } from '@/app/_redux/features/authApiSlice';
import { PiStar } from 'react-icons/pi';
import Spinner from '../Spinner';
import { useState } from 'react';
import UserImage from './UserImage';
import UserNav from './UserNav';

export default function LoggedIn() {
	const [isAvatarClicked, setIsAvatarClicked] = useState(false);
	const { data: user, isLoading } = useRetrieveUserQuery();
	return (
		<div className='relative flex flex-row items-center gap-5'>
			<span className='text-3xl text-grayThird hover:bg-grayOne hover:text-yellow-400 p-1 rounded-lg transition-colors duration-300 cursor-pointer'>
				<PiStar />
			</span>
			{isLoading ? (
				<Spinner size='small' />
			) : (
				<button
					onClick={() => {
						setIsAvatarClicked((isClicked) => !isClicked);
					}}
					className={`relative w-10 h-10 rounded-full transition-all duration-300 overflow-hidden ${
						isAvatarClicked ? 'ring-main' : 'ring-transparent'
					} ring-2 ring-offset-2 hover:ring-main cursor-pointer`}
				>
					<UserImage imageAlt={`Awatar ${user?.username}`} />
					{/* TODO add imageUrl */}
				</button>
			)}
			{isAvatarClicked && <UserNav user={user} />}
		</div>
	);
}
