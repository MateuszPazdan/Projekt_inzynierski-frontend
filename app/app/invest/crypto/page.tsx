import CryptoPortfolioHeader from '@/app/_components/invest/crypto/CryptoPortfolioHeader';
import CryptoPortfolioList from '@/app/_components/invest/crypto/CryptoPortfolioList';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col gap-10'>
			<CryptoPortfolioHeader />
			<CryptoPortfolioList />
		</div>
	);
}
