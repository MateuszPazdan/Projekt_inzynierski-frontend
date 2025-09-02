'use client';

import { useRetrieveGlobalSearchQuery } from '@/app/_redux/features/globalApiSlice';
import { useRef, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import Spinner from '../Spinner';
import Link from 'next/link';
import Image from 'next/image';
import { useClickOutside } from '@/app/_hook/useClickOutside';
import { useDebounce } from '@/app/_hook/useDebounce';

export default function NavSearch() {
	const [isExtended, setIsExtended] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const deboundedSearchQuery = useDebounce(searchQuery, 500);
	const [cryptoListLength, setCryptoListLength] = useState(5);
	const [stockListLength, setStockListLength] = useState(5);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const secRef = useRef<HTMLInputElement>(null);
	const {
		data: globalSearch,
		isLoading: isGlobalSearchLoading,
		isFetching: isglobalSearchFetching,
	} = useRetrieveGlobalSearchQuery({ search: deboundedSearchQuery });

	const closeModal = () => {
		setIsExtended(false);
		setCryptoListLength(5);
		setStockListLength(5);
	};

	useClickOutside(dropdownRef, closeModal, secRef);

	function handleLoadMore(loadMoreType?: 'crypto' | 'stocks') {
		if (loadMoreType === 'crypto') setCryptoListLength((length) => length + 10);
		if (loadMoreType === 'stocks') setStockListLength((length) => length + 10);
	}

	return (
		<div className='relative w-full max-w-[400px] mx-auto lg:mx-0'>
			<span className='absolute text-2xl left-2 top-1/2 -translate-y-1/2'>
				<PiMagnifyingGlass />
			</span>
			<input
				type='text'
				className=' border-grayThird bg-grayOne border rounded-lg focus:outline-none focus focus:border-main p-2 pl-10 w-full transition-colors duration-300 peer'
				placeholder='Szukaj'
				value={searchQuery}
				onChange={(e) => {
					setSearchQuery(e.target.value);
					setCryptoListLength(5);
					setStockListLength(5);
				}}
				onFocus={() => setIsExtended(true)}
				ref={secRef}
			/>
			<div
				ref={dropdownRef}
				className={`absolute  rounded-md border  border-grayThird shadow-md bg-white left-0 top-[110%] text-nowrap ${
					isExtended ? 'flex' : 'hidden'
				} flex-col text-sm overflow-hidden  overflow-y-auto max-h-[450px]  w-full`}
			>
				{isGlobalSearchLoading || isglobalSearchFetching ? (
					<span className='p-5'>
						<Spinner size='small' color='text-main' />
					</span>
				) : globalSearch?.cryptos.length === 0 &&
				  globalSearch?.stocks.length === 0 ? (
					<span className='p-5 text-center text-base text-gray-600'>
						Brak wyników wyszukiwania
					</span>
				) : (
					<div className='flex flex-col p-2 gap-2'>
						{globalSearch?.cryptos.length !== 0 && (
							<div>
								<p className='text-gray-600 font-medium pb-1'>Kryptowaluty</p>
								{globalSearch?.cryptos
									.slice(0, cryptoListLength)
									.map((crypto) => (
										<NavSearchAsset
											onClick={() => {
												closeModal();
												setSearchQuery('');
											}}
											asset={crypto}
											assetType='crypto'
											key={crypto.name}
										/>
									))}
							</div>
						)}
						{cryptoListLength < (globalSearch?.cryptos.length || 0) && (
							<button
								onClick={() => handleLoadMore('crypto')}
								className='text-main hover:text-second transition-colors duration-300 w-fit p-1'
							>
								Załaduj więcej
							</button>
						)}
						{globalSearch?.stocks.length !== 0 && (
							<div>
								<p className='text-gray-600 font-medium pb-1'>Akcje</p>
								{globalSearch?.stocks.slice(0, stockListLength).map((stock) => (
									<NavSearchAsset
										onClick={() => {
											closeModal();
											setSearchQuery('');
										}}
										asset={stock}
										assetType='stocks'
										key={stock.name}
									/>
								))}
							</div>
						)}
						{stockListLength < (globalSearch?.stocks.length || 0) && (
							<button
								onClick={() => handleLoadMore('stocks')}
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

function NavSearchAsset({
	asset,
	assetType,
	onClick,
}: {
	asset: {
		name: string;
		symbol: string;
		icon?: string;
		price: number;
		price_change_percentage_24h: number;
	};
	assetType: 'crypto' | 'stocks';
	onClick?: () => void;
}) {
	return (
		<Link
			href={`/market/${assetType === 'crypto' ? 'crypto' : 'stocks'}/${
				asset.symbol
			}`}
			key={asset.name}
			className='grid grid-cols-[1fr_auto] gap-1 text-sm p-2 rounded-md hover:bg-grayOne transition-colors duration-300'
			onClick={onClick}
		>
			<div className='flex flex-row items-center gap-2'>
				{'icon' in asset && asset.icon ? (
					<Image
						src={`${asset.icon}`}
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
		</Link>
	);
}

export { NavSearchAsset };
