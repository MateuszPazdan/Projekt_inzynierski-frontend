import UserImage from './UserImage';

interface UserInfoProps {
	username?: string;
	email?: string;
	imageUrl?: string;
}

export default function UserInfo({ username, email, imageUrl }: UserInfoProps) {
	return (
		<div className='flex flex-row gap-2 items-center p-1 px-2 pb-2  rounded-lg'>
			<div className='relative w-10 h-10 rounded-full overflow-hidden '>
				<UserImage imageAlt={`Awatar ${username}`} imageUrl={imageUrl} />
			</div>
			<div className='p-1'>
				<p className='text-lg'>{username}</p>
				<p className='text-xs text-gray-700'>{email}</p>
			</div>
		</div>
	);
}
