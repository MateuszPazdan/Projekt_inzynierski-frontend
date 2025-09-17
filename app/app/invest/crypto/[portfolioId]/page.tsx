import CryptoPortfolioDetails from '@/app/_components/invest/crypto/CryptoPortfolioDetails';

export default function page({ params }: { params: { portfolioId: string } }) {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-3'>
			<CryptoPortfolioDetails portfolioId={params.portfolioId} />
		</div>
	);
}
