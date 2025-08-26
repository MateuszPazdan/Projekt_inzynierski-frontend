import {
	getAllCryptoSymbols,
	getCryptoDetailsBySymbol,
} from '@/app/_actions/cryptoActions';
import CryptoDetailsCard from '@/app/_components/market/crypto/CryptoDetails';
import { notFound } from 'next/navigation';

export const revalidate = 600;

export async function generateStaticParams() {
	const cryptoSymbols: { symbol: string }[] =
		(await getAllCryptoSymbols()) ?? [];

	return cryptoSymbols.map((s) => ({
		cryptoSymbol: s.symbol,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ cryptoSymbol: string }>;
}) {
	const { cryptoSymbol } = await params;
	const crypto = await getCryptoDetailsBySymbol(cryptoSymbol);

	if (!crypto) {
		return { title: 'Nie znaleziono kryptowaluty | Asset Flow' };
	}

	return {
		title: `${crypto.name} | Asset Flow`,
		description: `Sprawdź aktualne dane, cenę i szczegóły kryptowaluty ${crypto.name}.`,
		openGraph: {
			title: `${crypto.name} | Asset Flow`,
			description: `Aktualne dane i wykresy dla ${crypto.name}.`,
		},
	};
}

export default async function page({
	params,
}: {
	params: { cryptoSymbol: string };
}) {
	const { cryptoSymbol } = params;
	const cryptoDetails = await getCryptoDetailsBySymbol(cryptoSymbol);

	if (!cryptoDetails) notFound();

	return (
		<div className='min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col '>
			<CryptoDetailsCard cryptoDetails={cryptoDetails} />
		</div>
	);
}
