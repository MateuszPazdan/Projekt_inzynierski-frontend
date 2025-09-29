import { CryptoDetails } from '@/app/_actions/cryptoActions';
import { useAppSelector } from '@/app/_redux/hooks';
import Image from 'next/image';
import { BsPlus } from 'react-icons/bs';
import Button from '../../Button';
import Modal from '../../Modal';
import AddAssetToPortfolioModal from '../AddAssetToPortfolioModal';

export default function CryptoDetailsHeader({
	cryptoDetails,
}: {
	cryptoDetails: CryptoDetails;
}) {
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	return (
		<div className='flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center pb-5'>
			<div className='flex flex-row gap-2 sm:gap-4 items-center'>
				<Image
					alt={`${cryptoDetails.name}-logo`}
					src={`${cryptoDetails.icon}`}
					width={48}
					height={48}
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
			{isAuthenticated && (
				<div className='flex gap-2'>
					<Modal>
						<Modal.Open opens='addCryptoToPortfolio'>
							<Button
								size='large'
								additionalClasses='h-12'
								color='dark'
								stretch
							>
								<BsPlus className='text-3xl' />
								<span className='mr-3'>Dodaj do portfela</span>
							</Button>
						</Modal.Open>
						<Modal.Window name='addCryptoToPortfolio'>
							<AddAssetToPortfolioModal
								onCloseModal={() => undefined}
								assetSymbol={cryptoDetails.symbol}
								assetType='crypto'
							/>
						</Modal.Window>
					</Modal>
				</div>
			)}
		</div>
	);
}
