import Image from 'next/image';
import { CryptoElement } from './Converter';
import { FaAngleDown } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/app/_hook/useClickOutside';

interface CoinAndValueInputProps {
	cryptoList: CryptoElement[];
	selectedCrypto?: CryptoElement;
	setSelectedCrypto?: (crypto: CryptoElement) => void;
	disabled?: boolean;
}

export default function CoinAndValueInput({
	cryptoList,
	selectedCrypto = cryptoList[0],
	setSelectedCrypto,
	disabled = false,
}: CoinAndValueInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const closeModal = () => {
		setIsOpen(false);
	};

	useClickOutside(listRef, closeModal, buttonRef);

	return (
		<div className='relative w-full'>
			<div className='flex flex-row gap-2 items-center p-2 bg-white border-grayThird border rounded-md'>
				<button
					type='button'
					ref={buttonRef}
					className='flex flex-row items-center gap-2 min-w-fit hover:cursor-pointer group'
					onClick={() => setIsOpen(!isOpen)}
				>
					<Image
						src={selectedCrypto.logo}
						alt={selectedCrypto.name}
						width={24}
						height={24}
					/>
					<p className='flex flex-col justify-center items-start'>
						<span className='text-sm font-semibold'>
							{selectedCrypto.symbol}
						</span>
						<span className='text-xs text-gray-500'>{selectedCrypto.name}</span>
					</p>
					<span className='text-gray-500 group-hover:text-second transition-colors duration-300'>
						<FaAngleDown />
					</span>
				</button>
				<input
					placeholder='1.00'
					min={0}
					step={0.000001}
					type='number'
					className='p-2 text-right bg-transparent outline-none appearance-none m-0 w-full'
					disabled={disabled}
				/>
			</div>
			<div
				ref={listRef}
				className={`absolute w-full z-[10] ${
					isOpen ? 'block' : 'hidden'
				} rounded-md border border-grayThird shadow-md bg-white left-0 top-[110%] transition-all duration-300 overflow-x-hidden max-h-[300px] md:max-h-[500px] overflow-y-auto`}
			>
				{cryptoList.map((crypto) => (
					<div
						key={crypto.symbol}
						className='flex items-center gap-2 px-2 py-3 hover:bg-grayTwo cursor-pointer hover:bg-grayOne '
						onClick={() => {
							setSelectedCrypto?.(crypto);
							setIsOpen(false);
						}}
					>
						<Image src={crypto.logo} alt={crypto.name} width={24} height={24} />
						<span className='text-sm font-semibold'>{crypto.symbol}</span>
						<span className='text-xs text-gray-500'>{crypto.name}</span>
					</div>
				))}
			</div>
		</div>
	);
}
