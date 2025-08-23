import { getCryptos } from '@/app/_actions/cryptoActions';
import EmptyList from '@/app/_components/EmptyList';
import CryptoList from '@/app/_components/market/CryptoList';
import SectionHeader from '@/app/_components/SectionHeader';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';

export default async function page({
	searchParams,
}: {
	searchParams: { page?: string };
}) {
	const page = Number(searchParams?.page) || 1;
	const crypto = await getCryptos({ page: Number(page) ?? 1 });
	return (
		<div className='flex-1 min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col'>
			<div className='pb-10'>
				<SectionHeader
					title='Rynek kryptowalut'
					description='Śledź ceny cyfrowych aktywów i ich zmiany w czasie.'
				/>
			</div>
			<Suspense
				fallback={
					<Spinner
						description='Wczytywanie kryptowalut...'
						size='large'
						color='text-main'
					/>
				}
			>
				{!crypto || crypto.items.length === 0 ? (
					<EmptyList description='Nie odnaleziono żadnych kryptowalut.' />
				) : (
					<CryptoList crypto={crypto} />
				)}
			</Suspense>
		</div>
	);
}
