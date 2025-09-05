import { Crypto, Stock } from '../_redux/features/marketApiSlice';

export function sortStocks(
	sort: { by: string; order: string },
	stockList?: Stock[]
) {
	if (!stockList) return;

	const list = [...stockList];

	if (sort.by === 'rank' && sort.order === 'asc') {
		return list.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
	}
	if (sort.by === 'rank' && sort.order === 'desc') {
		return list.sort((a, b) => b.market_cap_rank - a.market_cap_rank);
	}
	if (sort.by === 'currency' && sort.order === 'asc') {
		return list.sort((a, b) => a.name.localeCompare(b.name));
	}
	if (sort.by === 'currency' && sort.order === 'desc') {
		return list.sort((a, b) => b.name.localeCompare(a.name));
	}
	if (sort.by === 'price' && sort.order === 'asc') {
		return list.sort((a, b) => a.price - b.price);
	}
	if (sort.by === 'price' && sort.order === 'desc') {
		return list.sort((a, b) => b.price - a.price);
	}
	if (sort.by === 'change1h' && sort.order === 'asc') {
		return list.sort(
			(a, b) => a.price_change_percentage_1h - b.price_change_percentage_1h
		);
	}
	if (sort.by === 'change1h' && sort.order === 'desc') {
		return list.sort(
			(a, b) => b.price_change_percentage_1h - a.price_change_percentage_1h
		);
	}
	if (sort.by === 'change24h' && sort.order === 'asc') {
		return list.sort(
			(a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
		);
	}
	if (sort.by === 'change24h' && sort.order === 'desc') {
		return list.sort(
			(a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
		);
	}
	if (sort.by === 'change7d' && sort.order === 'asc') {
		return list.sort(
			(a, b) => a.price_change_percentage_7d - b.price_change_percentage_7d
		);
	}
	if (sort.by === 'change7d' && sort.order === 'desc') {
		return list.sort(
			(a, b) => b.price_change_percentage_7d - a.price_change_percentage_7d
		);
	}
	if (sort.by === 'volume_24h' && sort.order === 'asc') {
		return list.sort((a, b) => a.volume_24h - b.volume_24h);
	}
	if (sort.by === 'volume_24h' && sort.order === 'desc') {
		return list.sort((a, b) => b.volume_24h - a.volume_24h);
	}
	if (sort.by === 'market_cap' && sort.order === 'asc') {
		return list.sort((a, b) => a.market_cap - b.market_cap);
	}
	if (sort.by === 'market_cap' && sort.order === 'desc') {
		return list.sort((a, b) => b.market_cap - a.market_cap);
	}

	return list;
}

export function sortCryptos(
	sort: { by: string; order: string },
	stockList?: Crypto[]
) {
	if (!stockList) return;

	const list = [...stockList];

	if (sort.by === 'rank' && sort.order === 'asc') {
		return list.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
	}
	if (sort.by === 'rank' && sort.order === 'desc') {
		return list.sort((a, b) => b.market_cap_rank - a.market_cap_rank);
	}
	if (sort.by === 'currency' && sort.order === 'asc') {
		return list.sort((a, b) => a.name.localeCompare(b.name));
	}
	if (sort.by === 'currency' && sort.order === 'desc') {
		return list.sort((a, b) => b.name.localeCompare(a.name));
	}
	if (sort.by === 'price' && sort.order === 'asc') {
		return list.sort((a, b) => a.price - b.price);
	}
	if (sort.by === 'price' && sort.order === 'desc') {
		return list.sort((a, b) => b.price - a.price);
	}
	if (sort.by === 'change1h' && sort.order === 'asc') {
		return list.sort(
			(a, b) => a.price_change_percentage_1h - b.price_change_percentage_1h
		);
	}
	if (sort.by === 'change1h' && sort.order === 'desc') {
		return list.sort(
			(a, b) => b.price_change_percentage_1h - a.price_change_percentage_1h
		);
	}
	if (sort.by === 'change24h' && sort.order === 'asc') {
		return list.sort(
			(a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
		);
	}
	if (sort.by === 'change24h' && sort.order === 'desc') {
		return list.sort(
			(a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
		);
	}
	if (sort.by === 'change7d' && sort.order === 'asc') {
		return list.sort(
			(a, b) => a.price_change_percentage_7d - b.price_change_percentage_7d
		);
	}
	if (sort.by === 'change7d' && sort.order === 'desc') {
		return list.sort(
			(a, b) => b.price_change_percentage_7d - a.price_change_percentage_7d
		);
	}
	if (sort.by === 'volume_24h' && sort.order === 'asc') {
		return list.sort((a, b) => a.volume_24h - b.volume_24h);
	}
	if (sort.by === 'volume_24h' && sort.order === 'desc') {
		return list.sort((a, b) => b.volume_24h - a.volume_24h);
	}
	if (sort.by === 'market_cap' && sort.order === 'asc') {
		return list.sort((a, b) => a.market_cap - b.market_cap);
	}
	if (sort.by === 'market_cap' && sort.order === 'desc') {
		return list.sort((a, b) => b.market_cap - a.market_cap);
	}

	return list;
}

//TODO
// export function sortPortfolioAssets(
// 	sort: { by: string; order: string },
// 	portfolioList?: {
// 		id: number;
// 		crypto: PortfolioAsset;
// 	}[]
// ) {
// 	if (!portfolioList) return;

// 	const list = [...portfolioList];

// 	if (sort.by === 'currency' && sort.order === 'asc') {
// 		return list.sort((a, b) => a.crypto.name.localeCompare(b.crypto.name));
// 	}
// 	if (sort.by === 'currency' && sort.order === 'desc') {
// 		return list.sort((a, b) => b.crypto.name.localeCompare(a.crypto.name));
// 	}
// 	if (sort.by === 'price' && sort.order === 'asc') {
// 		return list.sort((a, b) => a.crypto.price - b.crypto.price);
// 	}
// 	if (sort.by === 'price' && sort.order === 'desc') {
// 		return list.sort((a, b) => b.crypto.price - a.crypto.price);
// 	}
// 	if (sort.by === 'change24h' && sort.order === 'asc') {
// 		return list.sort(
// 			(a, b) =>
// 				a.crypto.price_change_percentage_24h -
// 				b.crypto.price_change_percentage_24h
// 		);
// 	}
// 	if (sort.by === 'change24h' && sort.order === 'desc') {
// 		return list.sort(
// 			(a, b) =>
// 				b.crypto.price_change_percentage_24h -
// 				a.crypto.price_change_percentage_24h
// 		);
// 	}
// 	if (sort.by === 'total_cost' && sort.order === 'asc') {
// 		return list.sort((a, b) => a.totalCost - b.totalCost);
// 	}
// 	if (sort.by === 'total_cost' && sort.order === 'desc') {
// 		return list.sort((a, b) => b.totalCost - a.totalCost);
// 	}
// 	if (sort.by === 'average_cost' && sort.order === 'asc') {
// 		return list.sort((a, b) => a.averageBuyPrice - b.averageBuyPrice);
// 	}
// 	if (sort.by === 'average_cost' && sort.order === 'desc') {
// 		return list.sort((a, b) => b.averageBuyPrice - a.averageBuyPrice);
// 	}
// 	if (sort.by === 'total_profit_loss' && sort.order === 'asc') {
// 		return list.sort((a, b) => a.totalProfitLoss - b.totalProfitLoss);
// 	}
// 	if (sort.by === 'total_profit_loss' && sort.order === 'desc') {
// 		return list.sort((a, b) => b.totalProfitLoss - a.totalProfitLoss);
// 	}
// 	if (sort.by === 'resources' && sort.order === 'asc') {
// 		return list.sort((a, b) => a.amount - b.amount);
// 	}
// 	if (sort.by === 'resources' && sort.order === 'desc') {
// 		return list.sort((a, b) => b.amount - a.amount);
// 	}

// 	return list;
// }
