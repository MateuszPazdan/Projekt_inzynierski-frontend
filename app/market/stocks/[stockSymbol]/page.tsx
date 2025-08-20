import { getStockDetailsBySymbol } from '@/app/_actions/stockActions';

export default async function page({
	params,
}: {
	params: Promise<{ stockSymbol: string }>;
}) {
	const { stockSymbol } = await params;
	const stockDetails = await getStockDetailsBySymbol(stockSymbol);

	console.log(stockDetails);

	return <div></div>;
}
