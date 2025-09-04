import CryptoPortfolioDetails from '@/app/_components/invest/crypto/CryptoPortfolioDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Portfolio | Asset Flow',
	description: 'Zarządzaj swoim portfolio kryptowalutowym.',
};

export default function page({ params }: { params: { portfolioId: string } }) {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-3'>
			<CryptoPortfolioDetails portfolioId={params.portfolioId} />
		</div>
	);
}
