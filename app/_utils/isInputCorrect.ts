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

export function hasMinimumLength(password: string) {
	return password.length >= 8 ? true : false;
}

export function hasUpperCase(password: string) {
	return /[A-Z]/.test(password) ? true : false;
}

export function hasLowerCase(password: string) {
	return /[a-z]/.test(password) ? true : false;
}

export function hasDigit(password: string) {
	return /\d/.test(password) ? true : false;
}

export function hasSpecialChar(password: string) {
	return /[@$!%*?&]/.test(password) ? true : false;
}

export function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) return 'Niepoprawny E-mail';
	return true;
}
