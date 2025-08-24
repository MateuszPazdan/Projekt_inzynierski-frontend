import { getStockDetailsBySymbol } from '@/app/_actions/stockActions';
import StockDetailsCard from '@/app/_components/market/stock/StockDetails';

export const revalidate = 600;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ stockSymbol: string }>;
}) {
	const { stockSymbol } = await params;
	const stock = await getStockDetailsBySymbol(stockSymbol);

	return { title: `${stock?.name} | Asset Flow` };
}

export default async function page({
	params,
}: {
	params: Promise<{ stockSymbol: string }>;
}) {
	const { stockSymbol } = await params;
	const stockDetails = await getStockDetailsBySymbol(stockSymbol);

	if (!stockDetails) {
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
			<StockDetailsCard stockDetails={stockDetails} />
		</div>
	);
}
