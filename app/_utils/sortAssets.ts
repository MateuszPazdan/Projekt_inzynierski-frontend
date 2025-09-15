import { Crypto, Stock } from '../_redux/features/marketApiSlice';
import { WatchedCrypto } from '../_redux/features/portfiolioApiSlice';

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

export function sortPortfolioAssets(
	sort: { by: string; order: string },
	portfolioList?: WatchedCrypto[]
) {
	if (!portfolioList) return;

	const list = [...portfolioList];

	if (sort.by === 'currency' && sort.order === 'asc') {
		return list.sort((a, b) => a.crypto.name.localeCompare(b.crypto.name));
	}
	if (sort.by === 'currency' && sort.order === 'desc') {
		return list.sort((a, b) => b.crypto.name.localeCompare(a.crypto.name));
	}
	if (sort.by === 'price' && sort.order === 'asc') {
		return list.sort((a, b) => a.crypto.price - b.crypto.price);
	}
	if (sort.by === 'price' && sort.order === 'desc') {
		return list.sort((a, b) => b.crypto.price - a.crypto.price);
	}
	if (sort.by === 'change24h' && sort.order === 'asc') {
		return list.sort((a, b) => a.profit_loss_24h - b.profit_loss_24h);
	}
	if (sort.by === 'change24h' && sort.order === 'desc') {
		return list.sort((a, b) => b.profit_loss_24h - a.profit_loss_24h);
	}
	if (sort.by === 'total_cost' && sort.order === 'asc') {
		return list.sort((a, b) => a.total_invested - b.total_invested);
	}
	if (sort.by === 'total_cost' && sort.order === 'desc') {
		return list.sort((a, b) => b.total_invested - a.total_invested);
	}
	if (sort.by === 'average_cost' && sort.order === 'asc') {
		return list.sort((a, b) => a.avg_buy_price - b.avg_buy_price);
	}
	if (sort.by === 'average_cost' && sort.order === 'desc') {
		return list.sort((a, b) => b.avg_buy_price - a.avg_buy_price);
	}
	if (sort.by === 'total_profit_loss' && sort.order === 'asc') {
		return list.sort((a, b) => a.profit_loss - b.profit_loss);
	}
	if (sort.by === 'total_profit_loss' && sort.order === 'desc') {
		return list.sort((a, b) => b.profit_loss - a.profit_loss);
	}
	if (sort.by === 'resources' && sort.order === 'asc') {
		return list.sort((a, b) => a.holdings - b.holdings);
	}
	if (sort.by === 'resources' && sort.order === 'desc') {
		return list.sort((a, b) => b.holdings - a.holdings);
	}
	if (sort.by === 'current_value' && sort.order === 'asc') {
		return list.sort((a, b) => a.current_value - b.current_value);
	}
	if (sort.by === 'current_value' && sort.order === 'desc') {
		return list.sort((a, b) => b.current_value - a.current_value);
	}

	return list;
}
