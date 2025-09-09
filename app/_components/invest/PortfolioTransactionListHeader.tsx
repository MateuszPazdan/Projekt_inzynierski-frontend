import SortableTh from '../SortableTh';
import { thStyles } from './crypto/CurrentCryptoPortfolioTransactions';

export default function PortfolioTransactionListHeader() {
	return (
		<thead>
			<tr>
				<SortableTh
					thStyles={thStyles}
					textAlignment='left'
					additionalStyles='text-left'
				>
					Rodzaj
				</SortableTh>

				<SortableTh thStyles={thStyles} textAlignment='right'>
					Ilość
				</SortableTh>

				<SortableTh thStyles={thStyles} textAlignment='right'>
					Cena
				</SortableTh>

				<SortableTh thStyles={thStyles} textAlignment='right'>
					Wartość
				</SortableTh>

				<SortableTh thStyles={thStyles} textAlignment='right'>
					Zysk / Strata
				</SortableTh>
			</tr>
		</thead>
	);
}
