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

export interface StockDetails {
	symbol: string;
	name: string;
	sector: string;
	price: number;
	currency: string;
	volume_24h: number;
	market_cap: number;
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
	price_change_percentage_1h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	circulating_supply: number;
}

export interface StockHistoricalData {
	date: string;
	stock_id: number;
	close_price: number;
	low_price: number;
	interval: string;
	open_price: number;
	id: number;
	high_price: number;
	volume: number;
	period: string;
}

// await new Promise((resolve) => setTimeout(resolve, 1500));

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
		const data: Stock[] = await response.json();
		return data;
	} catch (error) {
		console.error('Nie udało się pobrać danych akcji.', error);
	}
}

export async function getStockDetailsBySymbol(stockSymbol: string) {
	try {
		const response = await fetch(
			`${API_URL}/portfolio/assets/stocks/${stockSymbol}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					next: 'no-cache',
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

export async function getStockHistoricalData(
	stockSymbol: string,
	period?: string
) {
	try {
		const response = await fetch(
			`${API_URL}/portfolio/assets/stocks/${stockSymbol}/historical?period=${
				period || 'max'
			}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					next: 'no-cache',
				},
			}
		);
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		const data: StockHistoricalData[] = await response.json();
		return data;
	} catch (error) {
		console.error('Nie udało się pobrać danych historycznych akcji.', error);
	}
}
