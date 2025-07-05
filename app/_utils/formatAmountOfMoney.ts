export function formatFullAmount(amount: number): string {
	const formatter = new Intl.NumberFormat('pl-PL', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return `${formatter.format(amount)} PLN`;
}
