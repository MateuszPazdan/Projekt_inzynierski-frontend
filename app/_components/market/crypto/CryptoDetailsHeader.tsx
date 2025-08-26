import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiStar } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../Button';
import { CryptoDetails } from '@/app/_actions/cryptoActions';
import Image from 'next/image';

export default function CryptoDetailsHeader({
	cryptoDetails,
}: {
	cryptoDetails: CryptoDetails;
}) {
	return (
		<div className='flex flex-row justify-between gap-5 items-center pb-5'>
			<div className='flex flex-row gap-2 md:gap-4 items-center'>
				<Image
					alt={`${cryptoDetails.name}-logo`}
					src={`${cryptoDetails.icon}`}
					width={56}
					height={56}
				/>
				<p className='flex flex-col items-start justify-center '>
					<span className='sm:text-lg md:text-xl font-semibold'>
						{cryptoDetails.name}
						<span className='p-1 rounded-lg inline-flex justify-center items-center text-sm text-gray-500 font-normal '>
							#{cryptoDetails.market_cap_rank}
						</span>
					</span>
					<span className='text-sm md:text-base text-gray-600'>
						{cryptoDetails.symbol.toUpperCase()}
					</span>
				</p>
			</div>
			<>
				<div className='md:hidden'>
					<Button size='icon' color='light'>
						<BsThreeDotsVertical />
					</Button>
				</div>
				<div className='hidden md:flex gap-2 '>
					<Button size='icon' color='light' onClick={() => {}}>
						<PiStar className='text-yellow-500 text-2xl' />
					</Button>
					<Button
						size='large'
						additionalClasses='h-12'
						color='light'
						onClick={() => {}}
					>
						<FaPlus className='mr-2 text-gray-500 font-semibold' />
						<span>Dodaj do inwestycji</span>
					</Button>
				</div>
			</>
		</div>
	);
}
