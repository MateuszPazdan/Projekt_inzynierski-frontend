import SortableTh from '../SortableTh';

interface PortfolioWachedListHeaderProps {
	sort: { by: string; order: string };
	handleSort: (sortItem: string) => void;
	thStyles: string;
}

export default function PortfolioWachedListHeader({
	sort,
	handleSort,
	thStyles,
}: PortfolioWachedListHeaderProps) {
	return (
		<thead>
			<tr>
				<SortableTh
					sortKey='currency'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='left'
					additionalStyles='text-left'
				>
					Waluta
				</SortableTh>

				<SortableTh
					sortKey='price'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Kurs
				</SortableTh>

				<SortableTh
					sortKey='change24h'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Zysk / Strata (24h)
				</SortableTh>

				<SortableTh
					sortKey='total_cost'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Całkowity koszt
				</SortableTh>

				<SortableTh
					sortKey='average_cost'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Średni koszt
				</SortableTh>

				<SortableTh
					sortKey='total_profit_loss'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Całkowity zysk / strata
				</SortableTh>

				<SortableTh
					sortKey='resources'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Zasoby
				</SortableTh>
			</tr>
		</thead>
	);
}
