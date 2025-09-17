import { Metadata } from 'next';
import Converter from '../_components/converter/Converter';
import SectionHeader from '../_components/SectionHeader';

export const metadata: Metadata = {
	title: 'Przelicznik cen aktywów',
};

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto '>
			<div className='pb-10'>
				<SectionHeader
					title='Przelicznik walut i instrumentów finansowych'
					description='Sprawdź najnowsze kursy intrumentów finansowych w stosunku do różnych
				światowych walut.'
				/>
			</div>
			<div className='flex flex-col items-center'>
				<Converter />
			</div>
		</div>
	);
}
