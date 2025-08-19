import { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	isLoading?: boolean;
	disabled?: boolean;
	size?: 'xs' | 'small' | 'large';
	color?: 'light' | 'dark' | 'danger';
	stretch?: boolean;
	additionalClasses?: string;
	ref?: React.Ref<HTMLButtonElement>;
}

function Button({
	children,
	isLoading,
	disabled,
	size = 'large',
	color = 'dark',
	stretch = false,
	additionalClasses = '',
	ref,
	...rest
}: ButtonProps) {
	return (
		<button
			className={`${
				color === 'light'
					? '	bg-white hover:bg-grayThird border border-grayThird  '
					: color === 'dark'
					? ' bg-main hover:bg-second text-white '
					: color === 'danger'
					? ' bg-red-500 hover:bg-red-600 text-white '
					: ' '
			} transition-colors duration-300  ${
				size === 'small'
					? ' px-5 py-2 text-base font-normal '
					: size === 'xs'
					? ' px-3 py-2 font-medium '
					: ' px-5 py-3 font-medium text-base '
			} rounded-lg text-nowrap flex flex-row items-center justify-center ${
				stretch && ' w-full '
			} ${additionalClasses}`}
			disabled={disabled || isLoading}
			{...rest}
			ref={ref}
		>
			{isLoading ? <Spinner size='small' /> : children}
		</button>
	);
}

export default Button;
