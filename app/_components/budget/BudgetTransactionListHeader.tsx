import SortableTh from '../SortableTh';

export default function BudgetTransactionListHeader() {
	return (
		<thead>
			<tr>
				<SortableTh textAlignment='left' additionalStyles='text-left'>
					Tytuł
				</SortableTh>
				<SortableTh textAlignment='right'>Kategoria</SortableTh>
				<SortableTh textAlignment='right'>Wartość</SortableTh>
			</tr>
		</thead>
	);
}
