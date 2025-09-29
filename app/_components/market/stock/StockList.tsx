'use client';

import StockListElement from './StockListElement';
import { useState } from 'react';
import { sortStocks } from '@/app/_utils/sortAssets';
import { useRetrieveStocksQuery } from '@/app/_redux/features/marketApiSlice';
import AssetListSkeleton from '../AssetListSkeleton';
import EmptyList from '../../EmptyList';
import { useSearchParams } from 'next/navigation';
import SearchParamsPagination from '../../SearchParamsPagination';
import InfoCard from '../../InfoCard';
import AssetListHeader from '../AssetListHeader';

export default function StockList() {
	const searchParams = useSearchParams();
	const currPage = Number(searchParams.get('page')) || 1;
	const [sort, setSort] = useState({ by: 'rank', order: 'asc' });
	const {
		data: stocks,
		isLoading: isStocksLoading,
		isFetching,
	} = useRetrieveStocksQuery(
		{
			page: currPage,
		},
		{
			pollingInterval: 600000,
		}
	);
	const stockList = sortStocks(sort, stocks?.items);

	const handleSort = (by: string) => {
		setSort((prev) => ({
			by,
			order: prev.by === by && prev.order === 'desc' ? 'asc' : 'desc',
		}));
	};

	if (isStocksLoading || isFetching) {
		return (
			<InfoCard title='Akcje'>
				<div className='overflow-x-auto'>
					<AssetListSkeleton />
				</div>
			</InfoCard>
		);
	}

	if (!stockList || stockList?.length === 0)
		return <EmptyList description='Nie odnaleziono żadnych akcji.' />;

	return (
		<InfoCard title='Akcje'>
			<div className='overflow-x-auto'>
				<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
					<AssetListHeader handleSort={handleSort} sort={sort} />
					<tbody className='divide-y divide-grayThird'>
						{stockList?.map((stock) => (
							<StockListElement stock={stock} key={stock.name} />
						))}
					</tbody>
				</table>
			</div>
			<SearchParamsPagination currPage={currPage} pages={stocks?.pages} />
		</InfoCard>
	);
}
