import { useState } from 'react';
import EmptyList from '../EmptyList';
import PortfolioWatchedListElement from './PortfolioWatchedListElement';
import PortfolioWachedListHeader from './PortfolioWatchedListHeader';
import {
	CryptoPortfolioDetails,
	StockPortfolioDetails,
} from '@/app/_redux/features/portfiolioApiSlice';
import PortfolioWatchedListSkeleton from './PortfolioWatchedListSkeleton';
import { sortPortfolioAssets } from '@/app/_utils/sortAssets';
import InfoCard from '../InfoCard';

interface PortfolioWatchedListProps {
	portfolioDetails?: CryptoPortfolioDetails | StockPortfolioDetails;
	isLoading: boolean;
}

export const thStyles = 'group px-3 py-2 ';

export default function PortfolioWatchedList({
	portfolioDetails,
	isLoading,
}: PortfolioWatchedListProps) {
	const [sort, setSort] = useState({ by: 'currency', order: 'asc' });

	const watchedCryptos = sortPortfolioAssets(
		sort,
		(portfolioDetails as CryptoPortfolioDetails)?.watched_cryptos ||
			(portfolioDetails as StockPortfolioDetails)?.watched_stocks
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
			<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
				<PortfolioWachedListHeader
					handleSort={handleSort}
					sort={sort}
					thStyles={thStyles}
				/>
				<tbody className='divide-y divide-grayThird'>
					{watchedCryptos.map((watchedElement) => (
						<PortfolioWatchedListElement
							key={watchedElement.id}
							watchedElement={watchedElement}
						/>
					))}
				</tbody>
			</table>
		</InfoCard>
	);
}
