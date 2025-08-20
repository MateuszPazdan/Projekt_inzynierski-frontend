import CryptoList from '@/app/_components/market/CryptoList';
import SectionHeader from '@/app/_components/SectionHeader';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto '>
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
