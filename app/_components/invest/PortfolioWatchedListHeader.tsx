import SortableTh from '../SortableTh';

interface PortfolioWachedListHeaderProps {
	sort: { by: string; order: string };
	handleSort: (sortItem: string) => void;
}

export default function PortfolioWachedListHeader({
	sort,
	handleSort,
}: PortfolioWachedListHeaderProps) {
	return (
		<thead>
			<tr>
				<SortableTh
					sortKey='currency'
					sort={sort}
					handleSort={handleSort}
					textAlignment='left'
					additionalStyles='text-left'
				>
					Waluta
				</SortableTh>

				<SortableTh
					sortKey='price'
					sort={sort}
					handleSort={handleSort}
					textAlignment='right'
				>
					Kurs / 24h
				</SortableTh>

				<SortableTh
					sortKey='change24h'
					sort={sort}
					handleSort={handleSort}
					textAlignment='right'
				>
					Zysk / Strata (24h)
				</SortableTh>

				<SortableTh
					sortKey='total_cost'
					sort={sort}
					handleSort={handleSort}
					textAlignment='right'
				>
					Całkowity koszt
				</SortableTh>

				<SortableTh
					sortKey='average_cost'
					sort={sort}
					handleSort={handleSort}
					textAlignment='right'
				>
					Średni koszt
				</SortableTh>

				<SortableTh
					sortKey='total_profit_loss'
					sort={sort}
					handleSort={handleSort}
					textAlignment='right'
				>
					Całkowity zysk / strata
				</SortableTh>

				<SortableTh
					sortKey='current_value'
					sort={sort}
					handleSort={handleSort}
					textAlignment='right'
				>
					Zasoby
				</SortableTh>
			</tr>
		</thead>
	);
}
