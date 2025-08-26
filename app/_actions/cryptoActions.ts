'use server';

const API_URL = `${process.env.NEXT_PUBLIC_HOST}/api/v1`;

export interface CryptoDetails {
	symbol: string;
	name: string;
	currency: string;
	volume_24h: number;
	market_cap: number;
	circulating_supply: number;
	market_cap_rank: number;
	icon: string;
	updated_at: string;
}

// await new Promise((resolve) => setTimeout(resolve, 1500));

export async function getCryptoDetailsBySymbol(crypto_symbol: string) {
	try {
		const response = await fetch(
			`${API_URL}/assets/cryptos/${crypto_symbol}/general`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		const data: CryptoDetails = await response.json();
		return data;
	} catch (error) {
		console.error('Nie udało się pobrać szczegółów kryptowaluty.', error);
	}
}

export async function getAllCryptoSymbols() {
	try {
		const response = await fetch(
			`${API_URL}/assets/cryptos/symbols`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		const data: { symbol: string }[] = await response.json();
		return data;
	} catch (error) {
		console.error('Nie udało się pobrać symboli kryptowalut.', error);
	}
}
