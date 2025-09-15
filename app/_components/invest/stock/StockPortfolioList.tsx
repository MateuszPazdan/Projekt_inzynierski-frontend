'use client';

import { useRetrieveStockPortfoliosQuery } from '@/app/_redux/features/portfiolioApiSlice';
import { useSearchParams } from 'next/navigation';
import SearchParamsPagination from '../../SearchParamsPagination';
import PortfolioList from '../PortfolioList';

export default function StockPortfolioList() {
	const searchParams = useSearchParams();
	const currPage = Number(searchParams.get('page')) || 1;
	const {
		data,
		isLoading: isStockPortfoliosLoading,
		isFetching: isStockPortfoliosFetching,
	} = useRetrieveStockPortfoliosQuery({
		size: 10,
		page: currPage,
	});

	return (
		<>
			<PortfolioList
				portfolioList={data?.items}
				isLoading={isStockPortfoliosLoading || isStockPortfoliosFetching}
                assetType={'stocks'}
			/>
			<SearchParamsPagination currPage={currPage} pages={data?.pages} />
		</>
	);
}
