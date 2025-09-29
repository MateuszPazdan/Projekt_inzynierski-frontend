import { PortfolioInfo } from '@/app/_redux/features/portfiolioApiSlice';
import EmptyList from '../EmptyList';
import PortfolioListElement from './PortfolioListElement';
import PortfolioListElementSkeleton from './PortfolioListElementSkeleton';

interface PortfolioListProps {
	isLoading?: boolean;
	portfolioList?: PortfolioInfo[];
	assetType: 'stocks' | 'crypto';
}

export default function PortfolioList({
	isLoading,
	portfolioList,
	assetType,
}: PortfolioListProps) {
	return (
		<div className='grid grid-cols-1 gap-2 sm:gap-5 items-stretch'>
			{isLoading ? (
				Array.from({ length: 5 }).map((_, i) => (
					<PortfolioListElementSkeleton key={i} />
				))
			) : portfolioList && portfolioList?.length > 0 ? (
				<>
					{portfolioList?.map((portfolio) => (
						<PortfolioListElement
							key={portfolio.id}
							portfolio={portfolio}
							assetType={assetType}
						/>
					))}
				</>
			) : (
				<EmptyList
					description='Dodaj nowy portfel, aby go tutaj zobaczyć.'
					title='Nie odnaleziono żadnego portfela.'
				/>
			)}
		</div>
	);
}
