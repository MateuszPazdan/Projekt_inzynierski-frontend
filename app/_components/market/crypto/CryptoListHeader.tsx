import SortableTh from '../../SortableTh';

interface CryptoListHeaderProps {
	sort: { by: string; order: string };
	handleSort: (sortItem: string) => void;
	thStyles: string;
}

export default function CryptoListHeader({
	sort,
	handleSort,
	thStyles,
}: CryptoListHeaderProps) {
	return (
		<thead>
			<tr>
				<th className='w-0'></th>
				<SortableTh
					sortKey='rank'
					sort={sort}
					handleSort={handleSort}
					thStyles='px-2 py-2 text-center group'
					textAlignment='center'
					additionalStyles='text-center'
				>
					#
				</SortableTh>

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
					sortKey='change1h'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					1h
				</SortableTh>

				<SortableTh
					sortKey='change24h'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					24h
				</SortableTh>

				<SortableTh
					sortKey='change7d'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					7d
				</SortableTh>

				<SortableTh
					sortKey='volume_24h'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Wolumen 24h
				</SortableTh>

				<SortableTh
					sortKey='market_cap'
					sort={sort}
					handleSort={handleSort}
					thStyles={thStyles}
					textAlignment='right'
				>
					Kapitalizacja
				</SortableTh>
			</tr>
		</thead>
	);
}
