import {
	getAllStockSymbols,
	getStockDetailsBySymbol,
} from '@/app/_actions/stockActions';
import StockDetailsCard from '@/app/_components/market/stock/StockDetails';
import { notFound } from 'next/navigation';

export const revalidate = 600;

export async function generateStaticParams() {
	const stockSymbols: { symbol: string }[] = (await getAllStockSymbols()) ?? [];

	return stockSymbols.map((s) => ({
		stockSymbol: s.symbol,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ stockSymbol: string }>;
}) {
	const { stockSymbol } = await params;
	const stock = await getStockDetailsBySymbol(stockSymbol);

	if (!stock) {
		return { title: 'Nie znaleziono akcji | Asset Flow' };
	}

	return {
		title: `${stock.name} | Asset Flow`,
		description: `Sprawdź aktualne dane, cenę i szczegóły akcji ${stock.name}.`,
		openGraph: {
			title: `${stock.name} | Asset Flow`,
			description: `Aktualne dane i wykresy dla ${stock.name}.`,
		},
	};
}

export default async function page({
	params,
}: {
	params: { stockSymbol: string };
}) {
	const { stockSymbol } = params;
	const stockDetails = await getStockDetailsBySymbol(stockSymbol);

	if (!stockDetails) notFound();

	return (
		<div className='min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col '>
			<StockDetailsCard stockDetails={stockDetails} />
		</div>
	);
}
