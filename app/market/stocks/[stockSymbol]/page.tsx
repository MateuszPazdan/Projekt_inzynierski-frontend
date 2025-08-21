import {
	getStockDetailsBySymbol,
	getStockHistoricalData,
} from '@/app/_actions/stockActions';
import StockDetailsCard from '@/app/_components/market/StockDetails';

export default async function page({
	params,
	searchParams,
}: {
	params: Promise<{ stockSymbol: string }>;
	searchParams: Promise<{ range?: string }>;
}) {
	const { stockSymbol } = await params;
	const { range } = await searchParams;
	const stockDetails = await getStockDetailsBySymbol(stockSymbol);
	const chartData = await getStockHistoricalData(stockSymbol, range);

	if (!stockDetails || !chartData) {
		return (
			<div className='min-h-full w-full flex items-center justify-center'>
				<p className='text-red-600'>
					Nie znaleziono szczegółów dla akcji: {stockSymbol}
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col '>
			<StockDetailsCard stockDetails={stockDetails} chartData={chartData} />
		</div>
	);
}
