import ShadowContainer from '../ShadowContainer';
import CryptoListElement from './CryptoListElement';

export const thStyles = 'px-1 py-2';

export default function CryptoList() {
	return (
		<ShadowContainer>
			<div className='overflow-x-auto w-full'>
				<table className='text-right divide-y divide-grayThird text-xs md:text-sm w-full min-w-[700px] bg-white'>
					<thead>
						<tr>
							<th className={`${thStyles} w-0 pl-2 md:pl-5`}></th>
							<th className={`${thStyles} text-center`}>#</th>
							<th className={`${thStyles} text-left`}>Waluta</th>
							<th className={`${thStyles}`}>Kurs</th>
							<th className={`${thStyles}`}>1h</th>
							<th className={`${thStyles}`}>24h</th>
							<th className={`${thStyles}`}>7d</th>
							<th className={`${thStyles}`}>Wolumen 24h</th>
							<th className={`${thStyles} pr-2 md:pr-5`}>Kapitalizacja</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-grayThird'>
						<CryptoListElement />
						<CryptoListElement />
					</tbody>
				</table>
			</div>
		</ShadowContainer>
	);
}
