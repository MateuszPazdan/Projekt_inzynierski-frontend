import { CryptoPortfolioDetails } from '@/app/_redux/features/portfiolioApiSlice';
import CurrentBalance from './CurrentBalance';
import PortfolioChange from './PortfolioChange';
import TopGainer from './TopGainer';
import TotalPortfolioChange from './TotalPortfolioChange';
import ManagePortfolioBtn from './ManagePortfolioBtn';
import Modal from '../Modal';
import Button from '../Button';
import { BsPlus } from 'react-icons/bs';
import AddCryptoModal from './crypto/AddCryptoModal';
import InfoCard from '../InfoCard';

interface PortfolioOverviewProps {
	portfolioDetails?: CryptoPortfolioDetails;
	isLoading: boolean;
}

export default function PortfolioOverview({
	portfolioDetails,
	isLoading,
}: PortfolioOverviewProps) {
	return (
		<>
			<div className='flex flex-col md:flex-row justify-between gap-5 items-center pb-5'>
				<div className='flex md:flex-row flex-row-reverse justify-between gap-5 items-center w-full md:w-fit'>
					{!isLoading ? (
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
						isLoading={isLoading}
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
								disabled={isLoading}
							>
								<BsPlus className='text-3xl' />
								<span className='mr-3'>Dodaj walutę</span>
							</Button>
						</Modal.Open>
						<Modal.Window name='addCoin'>
							{portfolioDetails && (
								<AddCryptoModal
									onCloseModal={() => undefined}
									portfolioId={portfolioDetails?.id}
								/>
							)}
						</Modal.Window>
					</Modal>
				</div>
			</div>
			<InfoCard title='Opis' isLoading={isLoading}>
				<p className='font-medium text-lg'>
					{portfolioDetails?.description || 'Brak opisu'}
				</p>
			</InfoCard>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
				<CurrentBalance
					balance={portfolioDetails?.total_investment}
					isLoading={isLoading}
				/>
				<PortfolioChange
					profit_loss={portfolioDetails?.profit_loss_24h}
					profit_loss_percentage={portfolioDetails?.percentage_profit_loss_24h}
					isLoading={isLoading}
				/>
				<TotalPortfolioChange
					profit_loss={portfolioDetails?.profit_loss}
					profit_loss_percentage={portfolioDetails?.profit_loss_percentage}
					isLoading={isLoading}
				/>
				<TopGainer portfolioDetails={portfolioDetails} isLoading={isLoading} />
			</div>
		</>
	);
}
