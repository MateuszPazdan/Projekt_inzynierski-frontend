import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '../Button';
import { PiStar } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import { StockDetails } from '@/app/_actions/stockActions';

export default function StockDetailsHeader({
	stockDetails,
}: {
	stockDetails: StockDetails;
}) {
	return (
		<div className='flex flex-row justify-between gap-5 items-center pb-5'>
			<div className='flex flex-row gap-2 md:gap-4 items-center'>
				<p
					className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-2xl aspect-square bg-main text-white rounded-full`}
				>
					{stockDetails?.name.trimStart().charAt(0).toUpperCase()}
				</p>
				<p className='flex flex-col items-start justify-center '>
					<span className='sm:text-lg md:text-xl font-semibold'>
						{stockDetails.name}
					</span>
					<span className='text-sm md:text-base text-gray-600'>
						{stockDetails.symbol}
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
