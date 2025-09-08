'use client';

import CurrentCryptoPortfolioOverview from './CurrentCryptoPortfolioOverview';
import CurrentCryptoPortfolioTransactions from './CurrentCryptoPortfolioTransactions';

interface CurrentCryptoPortfolioDetailsProps {
	portfolioId: string;
	cryptoSymbol: string;
}

export default function CurrentCryptoPortfolioDetails({
	portfolioId,
	cryptoSymbol,
}: CurrentCryptoPortfolioDetailsProps) {
	return (
		<>
			<CurrentCryptoPortfolioOverview
				portfolioId={portfolioId}
				cryptoSymbol={cryptoSymbol}
			/>

			<CurrentCryptoPortfolioTransactions
				portfolioId={portfolioId}
				cryptoSymbol={cryptoSymbol}
			/>
		</>
	);
}
