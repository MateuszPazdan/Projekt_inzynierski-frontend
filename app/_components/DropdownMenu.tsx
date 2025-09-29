'use client';

import { useRef } from 'react';
import { useClickOutside } from '@/app/_hook/useClickOutside';
import Button from './Button';
import { AnimatePresence, motion } from 'framer-motion';

interface BaseDropdownMenuProps {
	disabled?: boolean;
	children: React.ReactNode;
	isExtended: boolean;
	setIsExtended: React.Dispatch<React.SetStateAction<boolean>>;
	distanceFromTop?: number;
}

interface WithOpenIcon extends BaseDropdownMenuProps {
	openIcon: React.ReactNode;
	customOpenIcon?: never;
}

interface WithCustomOpenIcon extends BaseDropdownMenuProps {
	customOpenIcon: React.ReactNode;
	openIcon?: never;
}

type DropdownMenuProps = WithOpenIcon | WithCustomOpenIcon;

export default function DropdownMenu({
	disabled,
	openIcon,
	customOpenIcon,
	children,
	isExtended,
	setIsExtended,
	distanceFromTop,
}: DropdownMenuProps) {
	const buttonRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const closeModal = () => {
		setIsExtended(false);
	};

	useClickOutside(dropdownRef, closeModal, buttonRef);

	return (
		<div className='relative flex w-fit' ref={buttonRef}>
			{openIcon && (
				<Button
					size='icon'
					color='light'
					onClick={() => setIsExtended((isExtended) => !isExtended)}
					disabled={disabled}
				>
					{openIcon}
				</Button>
			)}
			{customOpenIcon && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						setIsExtended((isExtended) => !isExtended);
					}}
					disabled={disabled}
				>
					{customOpenIcon}
				</button>
			)}
			<AnimatePresence>
				{isExtended && (
					<motion.div
						ref={dropdownRef}
						className={`absolute rounded-lg p-2 gap-1  shadow-md bg-white left-0 md:left-auto md:right-0 top-[110%] text-nowrap z-10 flex flex-col text-sm `}
						style={{ top: `${distanceFromTop}%` || '110%' }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
