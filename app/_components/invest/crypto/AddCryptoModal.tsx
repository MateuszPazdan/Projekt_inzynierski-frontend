'use client';

import {
	CryptoPortfolioDetails,
	useAddWatchedCryptoPortfolioMutation,
	useRetrieveCryptoPortfolioDetailsQuery,
} from '@/app/_redux/features/portfiolioApiSlice';
import { useState } from 'react';
import ModalHeader from '../../ModalHeader';
import { useRetrieveGlobalSearchQuery } from '@/app/_redux/features/globalApiSlice';
import { useDebounce } from '@/app/_hook/useDebounce';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Spinner from '../../Spinner';

interface AddCryptoModalProps {
	onCloseModal: () => void;
	portfolioId: string;
}

export default function AddCryptoModal({
	onCloseModal,
	portfolioId,
}: AddCryptoModalProps) {
	const [inputValue, setInputValue] = useState('');
	const debouncedInputValue = useDebounce(inputValue, 300);
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveCryptoPortfolioDetailsQuery(portfolioId);
	const {
		data: globalSearch,
		isLoading: isGlobalSearchLoading,
		isFetching: isGlobalSearchFetching,
	} = useRetrieveGlobalSearchQuery({
		search: debouncedInputValue,
	});
	const [addWatchedCrypto, { isLoading: isAddwatchedCryptoLoading }] =
		useAddWatchedCryptoPortfolioMutation();

	function handleAddCrypto(crypto: { name: string; symbol: string }) {
		addWatchedCrypto({
			portfolioId: portfolioId,
			crypto_symbol: crypto.symbol,
		})
			.unwrap()
			.then(() => {
				onCloseModal();
				toast.success(`Dodano kryptowalutę (${crypto.symbol}) do portfolio.`);
			})
			.catch((error) => {
				console.log(error);
				toast.error(
					error?.data.detail ||
						`Wystąpił błąd podczas dodawania kryptowaluty (${crypto.symbol}) do portfolio.`
				);
			});
		onCloseModal();
	}

	const isLoading =
		isPortfolioDetailsLoading ||
		isGlobalSearchLoading ||
		isAddwatchedCryptoLoading ||
		isGlobalSearchFetching;

	return (
		<div className='flex flex-col gap-5'>
			<ModalHeader onCloseModal={onCloseModal} title='Dodaj walutę' />
			<input
				type='text'
				className=' border-grayThird bg-white border rounded-lg focus:outline-none focus focus:border-main p-2  w-full transition-colors duration-300 peer'
				placeholder='Szukaj'
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
			/>
			{isLoading ? (
				<span className='p-5'>
					<Spinner size='small' color='text-main' />
				</span>
			) : (
				<>
					{globalSearch && globalSearch?.cryptos.length > 0 ? (
						<div className='max-h-[300px] overflow-y-auto'>
							{globalSearch?.cryptos.map((crypto) => {
								const isAlreadyWatched = portfolioDetails?.watched_cryptos.some(
									(c) => c.crypto.symbol === crypto.symbol
								);
								return (
									<div
										key={crypto.name}
										className={`grid grid-cols-[1fr_auto] gap-1 text-sm p-2 rounded-md transition-colors duration-300 ${
											isAlreadyWatched
												? ' text-gray-400 '
												: 'hover:bg-grayOne cursor-pointer'
										}`}
										onClick={() => {
											if (!isAlreadyWatched) handleAddCrypto(crypto);
										}}
									>
										<div className='flex flex-row items-center gap-2'>
											<Image
												src={`${crypto.icon}`}
												alt={crypto.name}
												width={24}
												height={24}
												style={{
													filter: isAlreadyWatched ? 'grayscale(1)' : 'none',
												}}
											/>
											<p
												className={`font-medium line-clamp-1 ${
													isAlreadyWatched ? 'text-gray-400' : ''
												}`}
											>
												{crypto.name}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<span className='p-5 text-center text-base text-gray-600'>
							Brak wyników wyszukiwania
						</span>
					)}
				</>
			)}
		</div>
	);
}
