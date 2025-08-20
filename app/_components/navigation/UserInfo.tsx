import Image from 'next/image';

interface UserInfoProps {
	username?: string;
	email?: string;
	imageUrl?: string;
}
export default function UserInfo({ username, email, imageUrl }: UserInfoProps) {
	return (
		<div className='flex flex-row gap-2 items-center p-1 px-2 pb-2 rounded-lg max-w-full overflow-hidden'>
			<div className='relative min-w-10 h-10 rounded-full overflow-hidden'>
				<Image
					className='object-cover aspect-square'
					src={imageUrl ?? '/user.png'}
					alt={`Awatar ${username}`}
					width={40}
					height={40}
				/>
			</div>
			<div className='p-1 max-w-full overflow-hidden'>
				<p className='text-lg truncate'>{username}</p>
				<p className='text-xs text-gray-700 truncate'>{email}</p>
			</div>
		</div>
	);
}
