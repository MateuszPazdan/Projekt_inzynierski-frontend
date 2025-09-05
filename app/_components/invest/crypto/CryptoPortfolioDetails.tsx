'use client';

import { useRetrieveCryptoPortfolioDetailsQuery } from '@/app/_redux/features/portfiolioApiSlice';
import { notFound } from 'next/navigation';
import { BsPlus } from 'react-icons/bs';
import Button from '../../Button';
import InfoCard from '../../InfoCard';
import Modal from '../../Modal';
import ManagePortfolioBtn from '../ManagePortfolioBtn';
import PortfolioOverview from '../PortfolioOverview';
import PortfolioWatchedList from '../PortfolioWatchedList';
import AddCryptoModal from './AddCryptoModal';

interface CryptoPortfolioDetailsProps {
	portfolioId: string;
}

export default function CryptoPortfolioDetails({
	portfolioId,
}: CryptoPortfolioDetailsProps) {
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveCryptoPortfolioDetailsQuery(portfolioId);

	if (!portfolioDetails && !isPortfolioDetailsLoading) return notFound();

	return (
		<>
			<div className='flex flex-col md:flex-row justify-between gap-5 items-center pb-5'>
				<div className='flex md:flex-row flex-row-reverse justify-between gap-5 items-center w-full md:w-fit'>
					{!isPortfolioDetailsLoading ? (
						<>
							<p
								className='flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-2xl aspect-square text-white rounded-full'
								style={{ backgroundColor: portfolioDetails?.color }}
							>
								{portfolioDetails?.title.trimStart().charAt(0).toUpperCase()}
							</p>
							<p className='text-2xl md:text-3xl'>{portfolioDetails?.title}</p>
						</>
					) : (
						<>
							<div className='h-12 w-12 md:w-14 md:h-14 rounded-full shimmer' />
							<div className='h-9 w-32 sm:w-44 rounded shimmer' />
						</>
					)}
				</div>
				<div className='flex flex-row gap-3 w-full md:w-fit'>
					<ManagePortfolioBtn
						portfolio={portfolioDetails}
						isLoading={isPortfolioDetailsLoading}
						portfolioType='crypto'
					/>

					<Modal>
						<Modal.Open opens='addCoin'>
							<Button
								size='large'
								additionalClasses='h-12'
								color='dark'
								onClick={() => {}}
								stretch
							>
								<BsPlus className='text-3xl' />
								<span className='mr-3'>Dodaj walutę</span>
							</Button>
						</Modal.Open>
						<Modal.Window name='addCoin'>
							<AddCryptoModal
								onCloseModal={() => undefined}
								portfolioId={portfolioId}
							/>
						</Modal.Window>
					</Modal>
				</div>
			</div>
			<InfoCard title='Opis' isLoading={isPortfolioDetailsLoading}>
				<p className='font-medium text-lg'>
					{portfolioDetails?.description || 'Brak opisu'}
				</p>
			</InfoCard>
			<PortfolioOverview />
			<PortfolioWatchedList watchedList={portfolioDetails?.watched_cryptos} />
		</>
	);
}
