import { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	isLoading?: boolean;
	disabled?: boolean;
	size?: 'small' | 'large';
	color?: 'light' | 'dark';
	stretch?: boolean;
}

function Button({
	children,
	isLoading,
	disabled,
	size = 'large',
	color = 'dark',
	stretch = false,
	...rest
}: ButtonProps) {
	return (
		<button
			className={`${
				color === 'light'
					? '	bg-grayOne hover:bg-graySecond '
					: color === 'dark'
					? 'bg-main hover:bg-second text-white'
					: ' '
			} transition-colors duration-300  ${
				size === 'small'
					? 'px-5 py-2 text-base font-normal'
					: 'px-7 py-3 font-medium '
			} rounded-lg text-nowrap ${stretch && 'w-full'}`}
			disabled={disabled || isLoading}
			{...rest}
		>
			{isLoading ? <Spinner size='small' /> : children}
		</button>
	);
}

export default Button;
