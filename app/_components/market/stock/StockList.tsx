'use client';

import StockListElement from './StockListElement';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { sortStocks } from '@/app/_utils/sortAssets';
import { useRetrieveStocksQuery } from '@/app/_redux/features/marketApiSlice';
import AssetListSkeleton from '../AssetListSkeleton';
import EmptyList from '../../EmptyList';
import Pagination from '../../Pagination';

export const thStyles = 'group px-3 py-2 ';

export default function StockList() {
	const [currPage, setCurrPage] = useState(1);
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
				<thead>
					<tr>
						<th className={`w-0`}></th>
						<th
							className={`px-2 py-2 text-center group cursor-pointer`}
							onClick={() => handleSort('rank')}
						>
							<span className='flex flex-row items-center '>
								{sort.by === 'rank' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
								#
							</span>
						</th>
						<th
							className={`${thStyles} text-left cursor-pointer`}
							onClick={() => handleSort('currency')}
						>
							<span className='flex flex-row items-center'>
								Waluta
								{sort.by === 'currency' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
							</span>
						</th>
						<th
							className={`${thStyles} cursor-pointer`}
							onClick={() => handleSort('price')}
						>
							<span className='flex flex-row justify-end items-center '>
								{sort.by === 'price' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
								Kurs
							</span>
						</th>
						<th
							className={`${thStyles} cursor-pointer`}
							onClick={() => handleSort('change1h')}
						>
							<span className='flex flex-row justify-end items-center '>
								{sort.by === 'change1h' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
								1h
							</span>
						</th>
						<th
							className={`${thStyles} cursor-pointer`}
							onClick={() => handleSort('change24h')}
						>
							<span className='flex flex-row justify-end items-center '>
								{sort.by === 'change24h' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
								24h
							</span>
						</th>
						<th
							className={`${thStyles} cursor-pointer`}
							onClick={() => handleSort('change7d')}
						>
							<span className='flex flex-row justify-end items-center '>
								{sort.by === 'change7d' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
								7d
							</span>
						</th>
						<th
							className={`${thStyles} pr-2 md:pr-5 cursor-pointer`}
							onClick={() => handleSort('volume_24h')}
						>
							<span className='flex flex-row justify-end items-center '>
								{sort.by === 'volume_24h' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
								Wolumen 24h
							</span>
						</th>
						<th
							className={`${thStyles} pr-2 md:pr-3 cursor-pointer`}
							onClick={() => handleSort('market_cap')}
						>
							<span className='flex flex-row justify-end items-center '>
								{sort.by === 'market_cap' ? (
									sort.order === 'asc' ? (
										<FaAngleUp />
									) : (
										<FaAngleDown />
									)
								) : (
									<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
								)}
								Kapitalizacja
							</span>
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-grayThird'>
					{stockList?.map((stock) => (
						<StockListElement stock={stock} key={stock.name} />
					))}
				</tbody>
			</table>
			<Pagination
				currPage={currPage}
				pages={stocks?.pages}
				setCurrPage={setCurrPage}
			/>
		</div>
	);
}
