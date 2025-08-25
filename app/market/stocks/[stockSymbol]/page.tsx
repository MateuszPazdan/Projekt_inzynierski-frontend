import { getStockDetailsBySymbol } from '@/app/_actions/stockActions';
import StockDetailsCard from '@/app/_components/market/stock/StockDetails';

export const revalidate = 600;

export default async function page({
	params,
}: {
	params: { stockSymbol: string };
}) {
	const { stockSymbol } = params;
	const stockDetails = await getStockDetailsBySymbol(stockSymbol);

	return (
		<div className='min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col '>
			<StockDetailsCard stockDetails={stockDetails} />
		</div>
	);
}
