import { Stock } from '../_actions/stockActions';

export function sortStocks(
	sort: { by: string; order: string },
	stockList: Stock[]
) {
	if (sort.by === 'rank' && sort.order === 'asc') {
		stockList.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
	}
	if (sort.by === 'rank' && sort.order === 'desc') {
		stockList.sort((a, b) => b.market_cap_rank - a.market_cap_rank);
	}
	if (sort.by === 'currency' && sort.order === 'asc') {
		stockList.sort((a, b) => a.name.localeCompare(b.name));
	}
	if (sort.by === 'currency' && sort.order === 'desc') {
		stockList.sort((a, b) => b.name.localeCompare(a.name));
	}
	if (sort.by === 'price' && sort.order === 'asc') {
		stockList.sort((a, b) => a.price - b.price);
	}
	if (sort.by === 'price' && sort.order === 'desc') {
		stockList.sort((a, b) => b.price - a.price);
	}
	if (sort.by === 'change1h' && sort.order === 'asc') {
		stockList.sort(
			(a, b) => a.price_change_percentage_1h - b.price_change_percentage_1h
		);
	}
	if (sort.by === 'change1h' && sort.order === 'desc') {
		stockList.sort(
			(a, b) => b.price_change_percentage_1h - a.price_change_percentage_1h
		);
	}
	if (sort.by === 'change24h' && sort.order === 'asc') {
		stockList.sort(
			(a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
		);
	}
	if (sort.by === 'change24h' && sort.order === 'desc') {
		stockList.sort(
			(a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
		);
	}
	if (sort.by === 'change7d' && sort.order === 'asc') {
		stockList.sort(
			(a, b) => a.price_change_percentage_7d - b.price_change_percentage_7d
		);
	}
	if (sort.by === 'change7d' && sort.order === 'desc') {
		stockList.sort(
			(a, b) => b.price_change_percentage_7d - a.price_change_percentage_7d
		);
	}
	if (sort.by === 'volume_24h' && sort.order === 'asc') {
		stockList.sort((a, b) => a.volume_24h - b.volume_24h);
	}
	if (sort.by === 'volume_24h' && sort.order === 'desc') {
		stockList.sort((a, b) => b.volume_24h - a.volume_24h);
	}
	if (sort.by === 'market_cap' && sort.order === 'asc') {
		stockList.sort((a, b) => a.market_cap - b.market_cap);
	}
	if (sort.by === 'market_cap' && sort.order === 'desc') {
		stockList.sort((a, b) => b.market_cap - a.market_cap);
	}
}
