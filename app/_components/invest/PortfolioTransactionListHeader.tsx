import SortableTh from '../SortableTh';

export default function PortfolioTransactionListHeader() {
	return (
		<thead>
			<tr>
				<SortableTh textAlignment='left' additionalStyles='text-left'>
					Rodzaj
				</SortableTh>

				<SortableTh textAlignment='right'>Ilość</SortableTh>

				<SortableTh textAlignment='right'>Cena</SortableTh>

				<SortableTh textAlignment='right'>Wartość</SortableTh>

				<SortableTh textAlignment='right'>Zysk / Strata</SortableTh>
			</tr>
		</thead>
	);
}
