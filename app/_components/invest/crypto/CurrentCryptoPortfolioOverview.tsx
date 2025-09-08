import Image from 'next/image';
import Button from '../../Button';
import Modal from '../../Modal';
import ManageCryptoTransactionsBtn from './ManageCryptoTransactionsBtn';
import { useRetrieveCryptoPortfolioDetailsQuery } from '@/app/_redux/features/portfiolioApiSlice';
import { notFound } from 'next/navigation';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { BsPlus } from 'react-icons/bs';
import InfoCard from '../../InfoCard';

interface CurrentCryptoPortfolioOverviewProps {
	portfolioId: string;
	cryptoSymbol: string;
}

export default function CurrentCryptoPortfolioOverview({
	portfolioId,
	cryptoSymbol,
}: CurrentCryptoPortfolioOverviewProps) {
	const type = 'crypto';
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveCryptoPortfolioDetailsQuery(portfolioId, {
			skip: type !== 'crypto',
		});

	if (!portfolioDetails && !isPortfolioDetailsLoading) return notFound();

	const currentCrypto = portfolioDetails?.watched_cryptos.find(
		(crypto) => crypto.crypto.symbol === cryptoSymbol
	);

	if (!currentCrypto && !isPortfolioDetailsLoading) return notFound();

	return (
		<>
			<div className='flex flex-col md:flex-row justify-between gap-5 items-center pb-5'>
				<div className='flex flex-row md:flex-col justify-between md:justify-center gap-5 md:gap-2 items-center md:items-start w-full md:w-fit'>
					{!isPortfolioDetailsLoading ? (
						<>
							<div className='flex flex-row items-center gap-1 md:items-start'>
								<Image
									alt={`${currentCrypto?.crypto.symbol}-logo`}
									src={`${currentCrypto?.crypto.icon ?? ''}`}
									width={28}
									height={28}
								/>
								<div className='flex flex-col items-start justify-center '>
									<span className='text-lg font-medium'>
										{currentCrypto?.crypto.name}
									</span>
								</div>
							</div>
							<p className='text-lg md:text-3xl font-semibold'>
								{formatFullPrice(currentCrypto?.crypto.price)}
							</p>
						</>
					) : (
						<>
							<div className='h-7 w-7 md:w-14 md:h-14 rounded-full shimmer' />
							<div className='h-6 w-32 sm:w-44 rounded shimmer' />
						</>
					)}
				</div>
				<div className='flex flex-row gap-3 w-full md:w-fit'>
					<ManageCryptoTransactionsBtn
						portfolioId={portfolioId}
						assetSymbol={cryptoSymbol}
						isLoading={isPortfolioDetailsLoading}
						assetType='crypto'
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
								<span className='mr-3'>Dodaj transakcję</span>
							</Button>
						</Modal.Open>
						<Modal.Window name='addCoin'>
							<div>add transaction</div>
						</Modal.Window>
					</Modal>
				</div>
			</div>
			<div className='grid xl:grid-cols-5 gap-2'>
				<InfoCard
					title='Wartość aktywów'
					text={formatFullPrice(currentCrypto?.current_value)}
				/>
				<InfoCard title='Zasoby'>
					<p className='text-nowrap'>
						{currentCrypto?.holdings}{' '}
						{currentCrypto?.crypto.symbol.toUpperCase()}
					</p>
				</InfoCard>
				<InfoCard
					title='Koszt całkowity'
					text={formatFullPrice(currentCrypto?.total_invested)}
				/>
				<InfoCard
					title='Średni koszt'
					text={formatFullPrice(currentCrypto?.avg_buy_price)}
				/>
				<InfoCard title='Całkowity zysk / strata'>
					<p
						className={`${
							currentCrypto &&
							(currentCrypto?.profit_loss > 0
								? 'text-green-500'
								: currentCrypto?.profit_loss < 0
								? 'text-red-500'
								: '')
						}`}
					>
						{formatFullPrice(currentCrypto?.profit_loss)}
					</p>
				</InfoCard>
			</div>
		</>
	);
}
