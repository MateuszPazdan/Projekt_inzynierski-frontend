import HoldingsChangeChart from '@/app/_components/invest/HoldingsChangeChart';
import TotalHoldingsChart from '@/app/_components/invest/TotalHoldingsChart';
import { formatFullAmount } from '@/app/_utils/formatAmountOfMoney';

export default function page() {
	const totalInvestmentAmount = 123456.78;
	const totalInvestmentChange24h = 1234.56;
	const totalInvestmentProfitLoss = 5678.9;
	const largestInvestmentProfit = 91011.12;
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto '>
			<div className='flex flex-col justify-between items-start sm500:flex-row sm500:items-center gap-4 pb-10'>
				<p className='text-blackOne text-center text-3xl md:text-3xl lg:text-4xl'>
					Przegląd inwestycji
				</p>
			</div>
			<div className='flex flex-col gap-3'>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
					<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
						<p className='text-xl font-medium mb-2'>Szacowana wartość</p>
						<p>{formatFullAmount(totalInvestmentAmount)}</p>
					</div>
					<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
						<p className='text-xl font-medium mb-2'>Zmiana wartości 24h</p>
						<p>{formatFullAmount(totalInvestmentChange24h)}</p>
					</div>
					<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
						<p className='text-xl font-medium mb-2'>Całkowity zysk/strata</p>
						<p>{formatFullAmount(totalInvestmentProfitLoss)}</p>
					</div>
					<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
						<p className='text-xl font-medium mb-2'>Największy zysk</p>
						<p>{formatFullAmount(largestInvestmentProfit)}</p>
					</div>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
					<TotalHoldingsChart />
					<HoldingsChangeChart />
					
				</div>
			</div>
		</div>
	);
}
