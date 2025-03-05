import { useRetrieveUserQuery } from '@/app/_redux/features/authApiSlice';
import Image from 'next/image';
import { PiStar } from 'react-icons/pi';

export default function LoggedIn() {
	const { data: user, isLoading } = useRetrieveUserQuery();
	return (
		<div className='flex flex-row items-center gap-5'>
			<span className='text-3xl text-grayThird hover:bg-grayOne hover:text-yellow-400 p-1 rounded-lg transition-colors duration-300 cursor-pointer'>
				<PiStar />
			</span>
			<div className='relative w-10 h-10 rounded-full transition-all duration-300 overflow-hidden ring-transparent ring-2 ring-offset-2 hover:ring-main cursor-pointer'>
				<Image
					src={'/user.png'} //TODO dodaj zdjecie backedowe
					alt={`Awatar ${user?.username}`}
					fill
				/>
			</div>
		</div>
	);
}
