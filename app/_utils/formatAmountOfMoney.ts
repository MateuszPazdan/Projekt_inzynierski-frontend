export function formatFullAmount(amount: number): string {
	const formatter = new Intl.NumberFormat('pl-PL', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return `${formatter.format(amount)}`;
}

export function formatShortAmount(amount: number): string {
	const formatter = new Intl.NumberFormat('pl-PL', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

	if (amount >= 1_000_000) {
		const mln = amount / 1_000_000;
		const mlnLabel = Number.isInteger(mln) ? `${mln}` : `${mln.toPrecision(3)}`;
		return `${mlnLabel} mln zł`;
	}

	return `${formatter.format(amount)} zł`;
}
