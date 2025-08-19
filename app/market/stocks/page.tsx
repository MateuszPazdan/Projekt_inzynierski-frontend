import StockList from '@/app/_components/market/StockList';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';

export const revalidate = 0;

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto '>
			<p className='text-blackOne text-3xl md:text-3xl lg:text-4xl pb-10'>
				Ceny akcji
			</p>

			<Suspense
				fallback={
					<Spinner
						description='Wczytywanie akcji...'
						size='large'
						color='text-main'
					/>
				}
			>
				<StockList />
			</Suspense>
		</div>
	);
}
