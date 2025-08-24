export function formatShortPrice(amount: number): string {
	const formatter = new Intl.NumberFormat('pl-PL', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		notation: 'compact',
	});

	return `${formatter.format(amount)}`;
}

export function formatFullPrice(
	amount: number,
	maximumFractionDigits?: number
): string {
	const formatter = new Intl.NumberFormat('pl-PL', {
		maximumFractionDigits: maximumFractionDigits || 0,
		minimumSignificantDigits: 4,
		currency: 'PLN',
		style: 'currency',
	});

	return `${formatter.format(amount)}`;
}
