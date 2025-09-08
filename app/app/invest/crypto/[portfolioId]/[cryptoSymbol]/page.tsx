import CurrentCryptoPortfolioDetails from '@/app/_components/invest/crypto/CurrentCryptoPortfolioDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Crypto | Portfolio | Asset Flow',
	description: 'Zarządzaj transakcjami w swoim portfelu.',
};

export default function page({
	params,
}: {
	params: { portfolioId: string; cryptoSymbol: string };
}) {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-3'>
			<CurrentCryptoPortfolioDetails
				portfolioId={params.portfolioId}
				cryptoSymbol={params.cryptoSymbol}
			/>
		</div>
	);
}
