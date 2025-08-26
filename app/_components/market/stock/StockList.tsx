'use client';

import StockListElement from './StockListElement';
import { useState } from 'react';
import { sortStocks } from '@/app/_utils/sortAssets';
import { useRetrieveStocksQuery } from '@/app/_redux/features/marketApiSlice';
import AssetListSkeleton from '../AssetListSkeleton';
import EmptyList from '../../EmptyList';
import StockListHeader from './StockListHeader';
import { useSearchParams } from 'next/navigation';
import ServerPagination from '../../ServerPagination';

export const thStyles = 'group px-3 py-2 ';

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
			pollingInterval: 60000,
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
		return <AssetListSkeleton />;
	}

	if (!stockList || stockList?.length === 0)
		return <EmptyList description='Nie odnaleziono żadnych akcji.' />;

	return (
		<div
			className={`overflow-x-auto rounded-lg border border-grayThird shadow-md bg-white p-3 px-4`}
		>
			<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
				<StockListHeader
					handleSort={handleSort}
					sort={sort}
					thStyles={thStyles}
				/>
				<tbody className='divide-y divide-grayThird'>
					{stockList?.map((stock) => (
						<StockListElement stock={stock} key={stock.name} />
					))}
				</tbody>
			</table>
			<ServerPagination currPage={currPage} pages={stocks?.pages} />
		</div>
	);
}
