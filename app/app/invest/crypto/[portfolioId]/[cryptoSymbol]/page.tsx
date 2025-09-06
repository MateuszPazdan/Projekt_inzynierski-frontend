export default function page({
	params,
}: {
	params: { portfolioId: string; cryptoSymbol: string };
}) {
	console.log(params);
	return (
		<div>
			<p>{params.portfolioId}</p>
			<p>{params.cryptoSymbol}</p>
		</div>
	);
}
