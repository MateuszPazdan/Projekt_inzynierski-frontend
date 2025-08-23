'use server';

import { PaginatedResponse } from './stockActions';

const API_URL = `${process.env.NEXT_PUBLIC_HOST}/api/v1`;

export interface Crypto {
	symbol: string;
	name: string;
	price: number;
	currency: string;
	volume_24h: number;
	market_cap: number;
	price_change_percentage_1h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	circulating_supply: number;
	market_cap_rank: number;
	icon: string;
}

export async function getCryptos({
	search = '',
	page = 1,
	size = 50,
}: {
	search?: string;
	page?: number;
	size?: number;
}) {
	try {
		const response = await fetch(
			`${API_URL}/portfolio/assets/cryptos?search=${search}&page=${Number(
				page
			)}&size=${Number(size)}`,
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
		const data: PaginatedResponse<Crypto> = await response.json();

		return data;
	} catch (error) {
		console.error('Nie udało się pobrać danych kryptowalut.', error);
	}
}
