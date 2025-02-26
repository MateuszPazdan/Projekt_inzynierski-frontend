import { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	isLoading?: boolean;
	disabled?: boolean;
}

function Button({ children, isLoading, disabled, ...rest }: ButtonProps) {
	return (
		<button
			className={`bg-main hover:bg-second transition-colors duration-300 text-white font-medium px-7 py-3 rounded-lg`}
			disabled={disabled || isLoading}
			{...rest}
		>
			{isLoading ? <Spinner size='small' /> : children}
		</button>
	);
}

export default Button;
