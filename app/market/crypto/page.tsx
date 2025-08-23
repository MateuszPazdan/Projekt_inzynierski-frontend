import CryptoList from '@/app/_components/market/CryptoList';
import SectionHeader from '@/app/_components/SectionHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Kryptowaluty | Asset Flow',
	description:
		'Śledź ceny cyfrowych aktywów i ich zmiany w czasie na rynku kryptowalut.',
};

export default async function page() {
	return (
		<div className='flex-1 min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col'>
			<div className='pb-10'>
				<SectionHeader
					title='Rynek kryptowalut'
					description='Śledź ceny cyfrowych aktywów i ich zmiany w czasie.'
				/>
			</div>

			<CryptoList />
		</div>
	);
}
