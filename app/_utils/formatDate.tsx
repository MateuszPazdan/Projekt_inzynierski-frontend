export function formatDateLabel(dateString?: string): string {
	if (!dateString) return '';
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);

	const givenDate = new Date(dateString);
	const isToday = givenDate.toDateString() === today.toDateString();
	const isYesterday = givenDate.toDateString() === yesterday.toDateString();

	if (isToday) return 'Dzisiaj';
	if (isYesterday) return 'Wczoraj';

	return givenDate.toLocaleDateString('pl-PL', {
		weekday: 'long',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
}

export function formatTime(dateString?: string) {
	if (!dateString) return '';
	return new Date(dateString).toLocaleTimeString('pl-PL', {
		hour: '2-digit',
		minute: '2-digit',
	});
}

export function formatDateForInput(date: Date | string) {
	const dateObj = new Date(date);
	return dateObj.toISOString().slice(0, 16);
}
