import { useRetrieveUserQuery } from '@/app/_redux/features/authApiSlice';
import { useRef, useState } from 'react';
import Spinner from '../Spinner';
import UserImage from './UserImage';
import UserNav from './UserNav';

export default function LoggedIn() {
	const [isAvatarClicked, setIsAvatarClicked] = useState(false);
	const { data: user, isLoading } = useRetrieveUserQuery();
	const buttonRef = useRef<HTMLButtonElement>(null);
	return (
		<div className='relative flex flex-row items-center gap-5'>
			{/* <Link
				href='/watchlist'
				className='text-3xl text-grayThird hover:bg-grayOne hover:text-yellow-400 p-1 rounded-lg transition-colors duration-300 cursor-pointer'
			>
				<PiStar />
			</Link> */}
			{isLoading ? (
				<Spinner size='small' />
			) : (
				<button
					ref={buttonRef}
					onClick={() => {
						setIsAvatarClicked((isClicked) => !isClicked);
					}}
					className={`relative w-10 h-10 rounded-full transition-all duration-300 overflow-hidden ${
						isAvatarClicked ? 'ring-main' : 'ring-transparent'
					} ring-2 ring-offset-2 hover:ring-main cursor-pointer`}
				>
					<UserImage
						imageAlt={`Awatar ${user?.username}`}
						imageUrl={user?.avatar_image}
					/>
				</button>
			)}
			{isAvatarClicked && (
				<UserNav
					user={user}
					setIsAvatarClicked={setIsAvatarClicked}
					buttonRef={buttonRef}
				/>
			)}
		</div>
	);
}
