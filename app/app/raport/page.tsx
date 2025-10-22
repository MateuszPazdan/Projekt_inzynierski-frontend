import RaportContainer from '@/app/_components/raport/RaportContainer';
import SectionHeader from '@/app/_components/SectionHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Raporty z inwestycji ',
	description:
		'Analizuj swoje inwestycje dzięki szczegółowym raportom i statystykom dotyczącym Twojego portfela oraz rynku finansowego.',
};

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto '>
			<div className='pb-10'>
				<SectionHeader
					title='Raporty z inwestycji'
					description='Analizuj swoje inwestycje dzięki szczegółowym raportom i statystykom dotyczącym Twojego portfela oraz rynku finansowego.'
				/>
			</div>
			<RaportContainer />
		</div>
	);
}
