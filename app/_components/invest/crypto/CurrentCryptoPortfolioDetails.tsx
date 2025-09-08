'use client';

import CurrentCryptoPortfolioOverview from './CurrentCryptoPortfolioOverview';

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
		</>
	);
}
