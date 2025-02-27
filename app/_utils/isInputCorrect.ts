export function validatePassword(password: string) {
	const passwordRegex =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	if (!passwordRegex.test(password)) return 'Słabe Hasło';
	else return true;
}

export function validateRepeatPassword(
	password: string,
	repeatPassword: string
) {
	if (password !== repeatPassword) return 'Niespójne Hasła';
	else return true;
}

export function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) return 'Niepoprawny E-mail';
	return true;
}
