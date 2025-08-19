'use server';

const API_URL = `${process.env.NEXT_PUBLIC_HOST}/api/v1`;

export interface Stock {
	symbol: string;
	name: string;
	price: number;
	currency: string;
	volume_24h: number;
	market_cap: number;
	market_state: string;
	price_change_percentage_1h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	circulating_supply: number;
}

export async function getStocks() {
	try {
		const response = await fetch(`${API_URL}/portfolio/assets/stocks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				next: 'no-cache',
			},
		});
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		await new Promise((resolve) => setTimeout(resolve, 1500));
		const data: Stock[] = await response.json();
		return data;
	} catch (error) {
		console.error('Nie udało się pobrać danych akcji.', error);
	}
}
