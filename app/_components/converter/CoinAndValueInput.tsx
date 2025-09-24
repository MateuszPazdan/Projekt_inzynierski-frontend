import Image from 'next/image';
import { FaAngleDown } from 'react-icons/fa';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/app/_hook/useClickOutside';
import {
	ConverterAssetDetails,
	useRetrieveAssetsInConverterQuery,
} from '@/app/_redux/features/globalApiSlice';
import NoData from '../NoData';

interface CoinAndValueInputProps {
	selectedAsset: ConverterAssetDetails | undefined;
	setSelectedAsset: Dispatch<SetStateAction<ConverterAssetDetails | undefined>>;
	disabled?: boolean;
	amount?: number | string;
	setAmount?: Dispatch<SetStateAction<number | string>>;
}

export default function CoinAndValueInput({
	selectedAsset,
	setSelectedAsset,
	disabled = false,
	amount = 0,
	setAmount,
}: CoinAndValueInputProps) {
	const { data: assetList, isLoading } = useRetrieveAssetsInConverterQuery();

	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const [cryptoListLength, setCryptoListLength] = useState(5);
	const [stockListLength, setStockListLength] = useState(5);
	const [currenciesListLength, setCurrenciesListLength] = useState(5);

	const closeModal = () => {
		setIsOpen(false);
		setCryptoListLength(5);
		setStockListLength(5);
		setCurrenciesListLength(5);
	};

	useClickOutside(listRef, closeModal, buttonRef);

	function handleLoadMore(loadMoreType?: 'crypto' | 'stocks' | 'currencies') {
		if (loadMoreType === 'crypto') setCryptoListLength((length) => length + 10);
		if (loadMoreType === 'stocks') setStockListLength((length) => length + 10);
		if (loadMoreType === 'currencies')
			setCurrenciesListLength((length) => length + 10);
	}

	useEffect(() => {
		if (disabled) setSelectedAsset(assetList?.cryptos[1]);
		else setSelectedAsset(assetList?.cryptos[0]);
	}, [assetList, setSelectedAsset, disabled]);

	if (isLoading) return <div className='h-[58px] w-full shimmer rounded-md' />;
	if (!selectedAsset && !isLoading)
		return (
			<p className='w-full'>
				<NoData message='Brak danych' />
			</p>
		);
	return (
		<div className='relative w-full'>
			<div className='flex flex-row gap-2 items-center p-2 bg-white border-grayThird border rounded-md'>
				<button
					type='button'
					ref={buttonRef}
					className='flex flex-row items-center gap-2 min-w-fit hover:cursor-pointer group'
					onClick={() => setIsOpen(!isOpen)}
				>
					{selectedAsset &&
					'icon' in selectedAsset &&
					selectedAsset?.icon !== '' &&
					selectedAsset.icon ? (
						<Image
							src={`${selectedAsset.icon ?? ''}`}
							alt={selectedAsset.name}
							width={24}
							height={24}
						/>
					) : (
						<p className='flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full'>
							{selectedAsset?.name.trimStart().charAt(0).toUpperCase()}
						</p>
					)}
					<p className='flex flex-col justify-center items-start'>
						<span className='text-sm font-semibold'>
							{selectedAsset?.symbol.toUpperCase()}
						</span>
						<span className='text-xs text-gray-500'>{selectedAsset?.name}</span>
					</p>
					<span className='text-gray-500 group-hover:text-second transition-colors duration-300'>
						<FaAngleDown />
					</span>
				</button>
				<input
					min={0}
					type='number'
					className='p-2 text-right bg-transparent outline-none appearance-none m-0 w-full'
					disabled={disabled}
					value={isNaN(Number(amount)) ? 0 : Number(amount)}
					onChange={(e) => !disabled && setAmount?.(parseFloat(e.target.value))}
				/>
			</div>
			<div
				ref={listRef}
				className={`absolute w-full z-[10] ${
					isOpen ? 'block' : 'hidden'
				} rounded-md border border-grayThird shadow-md bg-white left-0 top-[110%] transition-all duration-300 overflow-x-hidden max-h-[300px] md:max-h-[500px] overflow-y-auto`}
			>
				{isLoading ? (
					<div className='h-4 w-[240px] shimmer rounded' />
				) : assetList?.cryptos.length === 0 &&
				  assetList?.stocks.length === 0 &&
				  assetList.currencies.length === 0 ? (
					<span className='p-5 text-center text-base text-gray-600'>
						Brak wyników wyszukiwania
					</span>
				) : (
					<div className='flex flex-col p-2 gap-2'>
						{assetList?.cryptos.length !== 0 && (
							<div>
								<p className='text-gray-600 font-medium pb-1'>Kryptowaluty</p>
								{assetList?.cryptos.slice(0, cryptoListLength).map((crypto) => (
									<Asset
										asset={crypto}
										key={crypto.name}
										onClick={() => setSelectedAsset(crypto)}
									/>
								))}
							</div>
						)}
						{cryptoListLength < (assetList?.cryptos.length || 0) && (
							<button
								onClick={() => handleLoadMore('crypto')}
								className='text-main hover:text-second transition-colors duration-300 w-fit p-1'
							>
								Załaduj więcej
							</button>
						)}
						{assetList?.stocks.length !== 0 && (
							<div>
								<p className='text-gray-600 font-medium pb-1'>Akcje</p>
								{assetList?.stocks.slice(0, stockListLength).map((stock) => (
									<Asset
										asset={stock}
										key={stock.name}
										onClick={() => setSelectedAsset(stock)}
									/>
								))}
							</div>
						)}
						{stockListLength < (assetList?.stocks.length || 0) && (
							<button
								onClick={() => handleLoadMore('stocks')}
								className='text-main hover:text-second transition-colors duration-300 w-fit p-1'
							>
								Załaduj więcej
							</button>
						)}
						{assetList?.currencies.length !== 0 && (
							<div>
								<p className='text-gray-600 font-medium pb-1'>Waluty</p>
								{assetList?.currencies
									.slice(0, currenciesListLength)
									.map((currency) => (
										<Asset
											asset={currency}
											key={currency.name}
											onClick={() => setSelectedAsset(currency)}
										/>
									))}
							</div>
						)}
						{currenciesListLength < (assetList?.currencies.length || 0) && (
							<button
								onClick={() => handleLoadMore('currencies')}
								className='text-main hover:text-second transition-colors duration-300 w-fit p-1'
							>
								Załaduj więcej
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

function Asset({
	asset,
	onClick,
}: {
	asset: ConverterAssetDetails;
	onClick?: () => void;
}) {
	return (
		<button
			key={asset.name}
			className='grid grid-cols-[1fr_auto] gap-1 text-sm p-2 rounded-md hover:bg-grayOne transition-colors duration-300 w-full'
			onClick={onClick}
		>
			<div className='flex flex-row items-center gap-2'>
				{'icon' in asset && asset?.icon !== '' && asset.icon ? (
					<Image
						src={`${asset.icon ?? ''}`}
						alt={asset.name}
						width={24}
						height={24}
					/>
				) : (
					<p className='flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full'>
						{asset?.name.trimStart().charAt(0).toUpperCase()}
					</p>
				)}
				<p className='font-medium truncate'>{asset.name}</p>
			</div>
		</button>
	);
}
