import { useState } from 'react';
import EmptyList from '../EmptyList';
import PortfolioWatchedListElement from './PortfolioWatchedListElement';
import PortfolioWachedListHeader from './PortfolioWatchedListHeader';

interface PortfolioWatchedListProps {
	watchedList?: {
		id: number;
		crypto: {
			symbol: string;
		};
	}[];
}

export const thStyles = 'group px-3 py-2 ';

export default function PortfolioWatchedList({
	watchedList,
}: PortfolioWatchedListProps) {
	const [sort, setSort] = useState({ by: 'rank', order: 'asc' });

	const cryptoList = watchedList;

	const handleSort = (by: string) => {
		setSort((prev) => ({
			by,
			order: prev.by === by && prev.order === 'desc' ? 'asc' : 'desc',
		}));
	};

	// if (isCryptosLoading || isCryptosFetching) {
	// 	return <AssetListSkeleton />;
	// }

	if (!cryptoList || cryptoList?.length === 0)
		return <EmptyList description='Nie odnaleziono żadnych kryptowalut.' />;

	return (
		<div className='overflow-x-auto rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 '>
			<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
				<PortfolioWachedListHeader
					handleSort={handleSort}
					sort={sort}
					thStyles={thStyles}
				/>
				<tbody className='divide-y divide-grayThird'>
					{cryptoList.map((watchedElement) => (
						<PortfolioWatchedListElement
							key={watchedElement.id}
							watchedElement={watchedElement}
						/>
					))}
				</tbody>
			</table>
			{/* <SearchParamsPagination currPage={currPage} pages={cryptos?.pages} /> */}
		</div>
	);
}
