import StockList from '@/app/_components/market/StockList';
import SectionHeader from '@/app/_components/SectionHeader';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';

export default function page({
	searchParams,
}: {
	searchParams: { page?: string };
}) {
	const page = Number(searchParams?.page) || 1;
	return (
		<div className='flex-1 min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col'>
			<div className='pb-10'>
				<SectionHeader
					title='Rynek akcji'
					description='Śledź aktualne dane giełdowe i podstawowe informacje o notowanych
				spółkach.'
				/>
			</div>
			<Suspense
				fallback={
					<Spinner
						description='Wczytywanie akcji...'
						size='large'
						color='text-main'
					/>
				}
			>
				<StockList page={page} />
			</Suspense>
		</div>
	);
}
