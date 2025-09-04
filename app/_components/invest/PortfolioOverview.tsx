import CurrentBalance from './CurrentBalance';
import HoldingsChangeChart from './HoldingsChangeChart';
import PortfolioChange from './PortfolioChange';
import TopGainer from './TopGainer';
import TotalHoldingsChart from './TotalHoldingsChart';
import TotalPortfolioChange from './TotalPortfolioChange';

const totalInvestmentAmount = 5740278321.42;
const totalInvestmentChange24h = {
	amount: -12500.09,
	percentage: -2.34,
};
const totalInvestmentProfitLoss = {
	amount: -56789.01,
	percentage: -4.56,
};
const largestInvestmentProfit = {
	amount: 1234235.67,
	percentage: 32.21,
	assetName: 'BTC',
	icon: '/bitcoin-logo-svgrepo-com.svg',
};

export default function PortfolioOverview() {
	return (
		<div className='flex flex-col gap-3'>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
				<CurrentBalance balance={totalInvestmentAmount} />
				<PortfolioChange investmentChange={totalInvestmentChange24h} />
				<TotalPortfolioChange investmentChange={totalInvestmentProfitLoss} />
				<TopGainer topGainer={largestInvestmentProfit} />
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<TotalHoldingsChart />
				<HoldingsChangeChart />
			</div>
		</div>
	);
}
