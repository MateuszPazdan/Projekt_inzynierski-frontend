import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface NavElementProps {
	href: string;
	icon: React.ReactNode;
	title: string;
	isExtended?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	isFocused?: boolean;
}

export default function NavElement({
	href,
	icon,
	title,
	isExtended = true,
	children,
	onClick,
	isFocused,
}: NavElementProps) {
	const [isNavElExtended, setIsNavElExtended] = useState(false);
	function extendNavElOnClick() {
		setIsNavElExtended((isExtended) => !isExtended);
	}
	useEffect(() => {
		setIsNavElExtended(false);
	}, [isExtended]);
	return (
		<div>
			<div className='flex  flex-row justify-between p-2 min-w-16 hover:bg-grayOne rounded-lg duration-300 transition-colors'>
				<Link
					href={href}
					className='w-full grid grid-cols-[auto_1fr_auto] items-center gap-2 '
					onClick={onClick}
				>
					<span
						className={`block pl-[5.5px] pb-[2px] text-xl ${
							isFocused ? 'text-main' : 'text-gray-700'
						}`}
					>
						{icon}
					</span>
					<p
						className={`text-base transition-opacity duration-300 ${
							isExtended ? 'opacity-100' : 'opacity-0'
						} ${isFocused ? 'text-main' : 'text-gray-700'}`}
					>
						{title}
					</p>
				</Link>
				{children && (
					<button
						onClick={extendNavElOnClick}
						className='p-2 bg-transparent hover:bg-graySecond/50 transition-colors duration-300 z-10 rounded-md'
						type='button'
					>
						<FaAngleDown />
					</button>
				)}
			</div>
			<div className='pl-5'>{isNavElExtended && children}</div>
		</div>
	);
}
