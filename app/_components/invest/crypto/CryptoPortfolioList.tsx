'use client';

import { useRetrieveCryptoPortfoliosQuery } from '@/app/_redux/features/portfiolioApiSlice';
import { useSearchParams } from 'next/navigation';
import SearchParamsPagination from '../../SearchParamsPagination';
import EmptyList from '../../EmptyList';
import PortfolioListElement from '../PortfolioListElement';
import PortfolioListElementSkeleton from '../PortfolioListElementSkeleton';

export default function CryptoPortfolioList() {
	const searchParams = useSearchParams();
	const currPage = Number(searchParams.get('page')) || 1;
	const {
		data,
		isLoading: isCryptoPortfoliosLoading,
		isFetching: isCryptoPortfoliosFetching,
	} = useRetrieveCryptoPortfoliosQuery({
		size: 10,
		page: currPage,
	});
	const cryptoPortfolios = data?.items;

	return (
		<div className='grid grid-cols-1 gap-2 sm:gap-5 items-stretch'>
			{isCryptoPortfoliosLoading || isCryptoPortfoliosFetching ? (
				Array.from({ length: 5 }).map((_, i) => (
					<PortfolioListElementSkeleton key={i} />
				))
			) : cryptoPortfolios && cryptoPortfolios?.length > 0 ? (
				<>
					{cryptoPortfolios?.map((portfolio) => (
						<PortfolioListElement key={portfolio.id} portfolio={portfolio} />
					))}
					<SearchParamsPagination currPage={currPage} pages={data?.pages} />
				</>
			) : (
				<EmptyList
					description='Dodaj nowe portfolio, aby je tutaj zobaczyć.'
					title='Nie odnaleziono żadnych portfolio.'
				/>
			)}
		</div>
	);
}
