export function formatShortPrice(amount: number): string {
	const formatter = new Intl.NumberFormat('pl-PL', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		notation: 'compact',
	});

	return `${formatter.format(amount)}`;
}

export function formatFullPrice(amount: number | undefined): string {
	if (!amount) return '0 zł';
	const formatterr = new Intl.NumberFormat('pl-PL', {
		minimumSignificantDigits: amount < 1 ? 2 : undefined,
		maximumSignificantDigits: amount < 1 ? 4 : undefined,
		minimumFractionDigits: amount >= 1 ? 2 : undefined,
		currency: 'PLN',
		style: 'currency',
	});

	return `${formatterr.format(amount)}`;
}
