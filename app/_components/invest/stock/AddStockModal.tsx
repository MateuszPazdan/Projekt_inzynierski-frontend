'use client';

import { useDebounce } from '@/app/_hook/useDebounce';
import { useRetrieveGlobalSearchQuery } from '@/app/_redux/features/globalApiSlice';
import {
	useAddWatchedStockPortfolioMutation,
	useRetrieveStockPortfolioDetailsQuery,
} from '@/app/_redux/features/portfiolioApiSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ModalHeader from '../../ModalHeader';
import Spinner from '../../Spinner';

interface AddStockModalProps {
	onCloseModal: () => void;
	portfolioId?: string;
}

export default function AddStockModal({
	onCloseModal,
	portfolioId,
}: AddStockModalProps) {
	const [inputValue, setInputValue] = useState('');
	const debouncedInputValue = useDebounce(inputValue, 300);
	const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
		useRetrieveStockPortfolioDetailsQuery(portfolioId || '');
	const {
		data: globalSearch,
		isLoading: isGlobalSearchLoading,
		isFetching: isGlobalSearchFetching,
	} = useRetrieveGlobalSearchQuery({
		search: debouncedInputValue,
	});
	const [addWatchedStock, { isLoading: isAddwatchedStockLoading }] =
		useAddWatchedStockPortfolioMutation();

	function handleAddStock(stock: { name: string; symbol: string }) {
		addWatchedStock({
			portfolioId: portfolioId || '',
			stock_symbol: stock.symbol,
		})
			.unwrap()
			.then(() => {
				onCloseModal();
				toast.success(`Dodano akcję (${stock.symbol}) do portfolio.`);
			})
			.catch((error) => {
				toast.error(
					error?.data.detail ||
						`Wystąpił błąd podczas dodawania kryptowaluty (${stock.symbol}) do portfolio.`
				);
			});
		onCloseModal();
	}

	const isLoading =
		isPortfolioDetailsLoading ||
		isGlobalSearchLoading ||
		isAddwatchedStockLoading ||
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
					{globalSearch && globalSearch?.stocks.length > 0 ? (
						<div className='max-h-[300px] overflow-y-auto'>
							{globalSearch?.stocks.map((stock) => {
								const isAlreadyWatched = portfolioDetails?.watched_stocks.some(
									(s) => s.stock.symbol === stock.symbol
								);
								return (
									<div
										key={stock.name}
										className={`grid grid-cols-[1fr_auto] gap-1 text-sm p-2 rounded-md transition-colors duration-300 ${
											isAlreadyWatched
												? ' text-gray-400 '
												: 'hover:bg-grayOne cursor-pointer'
										}`}
										onClick={() => {
											if (!isAlreadyWatched) handleAddStock(stock);
										}}
									>
										<div className='flex flex-row items-center gap-2'>
											<p
												className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
											>
												{stock.name.trimStart().charAt(0).toUpperCase()}
											</p>
											<p className='font-medium truncate'>
												{stock.name}
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
