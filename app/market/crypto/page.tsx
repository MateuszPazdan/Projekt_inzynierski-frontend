import CryptoList from '@/app/_components/market/CryptoList';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto '>
			<p className='text-blackOne text-3xl md:text-3xl lg:text-4xl pb-10'>
				Ceny kryptowalut
			</p>

			<CryptoList />
		</div>
	);
}
