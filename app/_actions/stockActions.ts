'use server';

const API_URL = `${process.env.NEXT_PUBLIC_HOST}/api/v1`;

export interface StockDetails {
	symbol: string;
	name: string;
	sector: string;
	currency: string;
	volume_24h: number;
	market_cap: number;
	market_cap_rank: number;
	market_state: string;
	description: string;
	debt_to_equity: number;
	trailing_annual_dividend_yield: number;
	return_on_equity: number;
	free_cashflow: number;
	payout_ratio: number;
	price_to_book: number;
	price_to_sales: number;
	eps_trailing_twelve_months: number;
	beta: number;
	pe_ratio: number;
	average_volume_10d: number;
	employees: number;
	circulating_supply: number;
	updated_at: string;
}

// await new Promise((resolve) => setTimeout(resolve, 1500));

export async function getStockDetailsBySymbol(stockSymbol: string) {
	try {
		const response = await fetch(
			`${API_URL}/assets/stocks/${stockSymbol}/general`,
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
		const data: StockDetails = await response.json();
		return data;
	} catch (error) {
		console.error('Nie udało się pobrać szczegółów akcji.', error);
	}
}

export async function getAllStockSymbols() {
	try {
		const response = await fetch(`${API_URL}/assets/stocks/symbols`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		const data: { symbol: string }[] = await response.json();
		return data;
	} catch (error) {
		console.error('Nie udało się pobrać symboli akcji.', error);
	}
}
