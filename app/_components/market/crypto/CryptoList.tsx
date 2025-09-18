'use client';

import { useState } from 'react';
import { sortCryptos } from '@/app/_utils/sortAssets';
import CryptoListElement from './CryptoListElement';
import { useRetrieveCryptosQuery } from '@/app/_redux/features/marketApiSlice';
import AssetListSkeleton from '../AssetListSkeleton';
import EmptyList from '../../EmptyList';
import CryptoListHeader from './CryptoListHeader';
import { useSearchParams } from 'next/navigation';
import SearchParamsPagination from '../../SearchParamsPagination';
import InfoCard from '../../InfoCard';

export default function CryptoList() {
	const searchParams = useSearchParams();
	const currPage = Number(searchParams.get('page')) || 1;
	const [sort, setSort] = useState({ by: 'rank', order: 'asc' });
	const {
		data: cryptos,
		isLoading: isCryptosLoading,
		isFetching: isCryptosFetching,
	} = useRetrieveCryptosQuery(
		{
			page: currPage,
		},
		{
			pollingInterval: 600000,
		}
	);
	const cryptoList = sortCryptos(sort, cryptos?.items);

	const handleSort = (by: string) => {
		setSort((prev) => ({
			by,
			order: prev.by === by && prev.order === 'desc' ? 'asc' : 'desc',
		}));
	};

	if (isCryptosLoading || isCryptosFetching) {
		return <AssetListSkeleton />;
	}

	if (!cryptoList || cryptoList?.length === 0)
		return <EmptyList description='Nie odnaleziono żadnych kryptowalut.' />;

	return (
		<InfoCard title='Kryptowaluty'>
			<div className='overflow-x-auto'>
				<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
					<CryptoListHeader handleSort={handleSort} sort={sort} />
					<tbody className='divide-y divide-grayThird'>
						{cryptoList.map((crypto) => (
							<CryptoListElement key={crypto.name} crypto={crypto} />
						))}
					</tbody>
				</table>
			</div>
			<SearchParamsPagination currPage={currPage} pages={cryptos?.pages} />
		</InfoCard>
	);
}
