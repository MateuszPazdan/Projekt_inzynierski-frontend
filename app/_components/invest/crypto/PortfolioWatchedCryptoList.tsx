import { CryptoPortfolioDetails } from '@/app/_redux/features/portfiolioApiSlice';
import { sortPortfolioCrypto } from '@/app/_utils/sortAssets';
import { useState } from 'react';
import EmptyList from '../../EmptyList';
import InfoCard from '../../InfoCard';
import PortfolioWachedListHeader from '../PortfolioWatchedListHeader';
import PortfolioWatchedListSkeleton from '../PortfolioWatchedListSkeleton';
import PortfolioWatchedCryptoListElement from './PortfolioWatchedCryptoListElement';

interface PortfolioWatchedListProps {
	portfolioDetails?: CryptoPortfolioDetails;
	isLoading: boolean;
}

export default function PortfolioWatchedCryptoList({
	portfolioDetails,
	isLoading,
}: PortfolioWatchedListProps) {
	const [sort, setSort] = useState({ by: 'currency', order: 'asc' });

	const watchedCryptos = sortPortfolioCrypto(
		sort,
		portfolioDetails?.watched_cryptos
	);

	const handleSort = (by: string) => {
		setSort((prev) => ({
			by,
			order: prev.by === by && prev.order === 'desc' ? 'asc' : 'desc',
		}));
	};

	if (isLoading) {
		return <PortfolioWatchedListSkeleton />;
	}

	if (!watchedCryptos || watchedCryptos?.length === 0)
		return (
			<InfoCard title='Twoje aktywa'>
				<EmptyList
					title='Brak aktyw'
					description='Dodaj aktywa do portfolio, aby je tutaj zobaczyć.'
				/>
			</InfoCard>
		);

	return (
		<InfoCard title='Twoje aktywa'>
			<div className='overflow-x-auto'>
				<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
					<PortfolioWachedListHeader handleSort={handleSort} sort={sort} />
					<tbody className='divide-y divide-grayThird'>
						{watchedCryptos.map((watchedElement) => (
							<PortfolioWatchedCryptoListElement
								key={watchedElement.id}
								watchedElement={watchedElement}
							/>
						))}
					</tbody>
				</table>
			</div>
		</InfoCard>
	);
}
