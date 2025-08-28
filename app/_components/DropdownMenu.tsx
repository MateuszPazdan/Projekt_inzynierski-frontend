import { useRef } from 'react';
import { useClickOutside } from '@/app/_hook/useClickOutside';
import Button from './Button';

interface ManageBudgetBtnProps {
	disabled?: boolean;
	openIcon: React.ReactNode;
	children: React.ReactNode;
	isExtended: boolean;
	setIsExtended: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DropdownMenu({
	disabled,
	openIcon,
	children,
	isExtended,
	setIsExtended,
}: ManageBudgetBtnProps) {
	const buttonRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const closeModal = () => {
		setIsExtended(false);
	};

	useClickOutside(dropdownRef, closeModal, buttonRef);

	return (
		<div className='relative flex' ref={buttonRef}>
			<Button
				size='icon'
				color='light'
				onClick={() => setIsExtended((isExtended) => !isExtended)}
				disabled={disabled}
			>
				{openIcon}
			</Button>
			<div
				ref={dropdownRef}
				className={`absolute  rounded-md border  border-grayThird shadow-md bg-white left-0 md:left-auto md:right-0 top-[110%] text-nowrap ${
					isExtended ? 'flex' : 'hidden'
				} flex-col text-sm overflow-hidden`}
			>
				{children}
			</div>
		</div>
	);
}
