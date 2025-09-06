import { useRef } from 'react';
import { useClickOutside } from '@/app/_hook/useClickOutside';
import Button from './Button';

interface BaseManageBudgetBtnProps {
	disabled?: boolean;
	children: React.ReactNode;
	isExtended: boolean;
	setIsExtended: React.Dispatch<React.SetStateAction<boolean>>;
}

interface WithOpenIcon extends BaseManageBudgetBtnProps {
	openIcon: React.ReactNode;
	customOpenIcon?: never;
}

interface WithCustomOpenIcon extends BaseManageBudgetBtnProps {
	customOpenIcon: React.ReactNode;
	openIcon?: never;
}

type ManageBudgetBtnProps = WithOpenIcon | WithCustomOpenIcon;

export default function DropdownMenu({
	disabled,
	openIcon,
	customOpenIcon,
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
			<div
				ref={dropdownRef}
				className={`absolute rounded-lg border p-2 gap-1 border-grayThird shadow-md bg-white left-0 md:left-auto md:right-0 top-[110%] text-nowrap z-10 ${
					isExtended ? 'flex' : 'hidden'
				} flex-col text-sm overflow-hidden`}
			>
				{children}
			</div>
		</div>
	);
}
