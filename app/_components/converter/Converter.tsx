'use client';

import { BsArrowDownUp } from 'react-icons/bs';
import { useState } from 'react';
import CoinAndValueInput from './CoinAndValueInput';

const cryptoList = [
	{
		name: 'Bitcoin',
		symbol: 'BTC',
		logo: '/bitcoin-logo-svgrepo-com.svg',
		price: 67000,
	},
	{
		name: 'Ethereum',
		symbol: 'ETH',
		logo: '/eth-svgrepo-com.svg',
		price: 3500,
	},
	{
		name: 'Chainlink',
		symbol: 'LINK',
		logo: '/chainlink-svgrepo-com.svg',
		price: 14,
	},
	{
		name: 'Litecoin',
		symbol: 'LTC',
		logo: '/litecoin-svgrepo-com.svg',
		price: 80,
	},
	{
		name: 'Ripple',
		symbol: 'XRP',
		logo: '/ripple-svgrepo-com.svg',
		price: 0.5,
	},
	{
		name: 'Dogecoin',
		symbol: 'DOGE',
		logo: '/doge-svgrepo-com.svg',
		price: 0.15,
	},
];

export interface CryptoElement {
	name: string;
	symbol: string;
	logo: string;
	price: number;
}

export default function Converter() {
	const [selectedCrypto, setSelectedCrypto] = useState(cryptoList[0]);
	const [secondSelectedCrytpo, setSecondSelectedCrypto] = useState(
		cryptoList[1]
	);
	return (
		<div className=' flex flex-col gap-5 rounded-lg sm:border border-grayThird sm:shadow-md sm:bg-white sm:p-5 w-full'>
			<div className='relative flex flex-col md:flex-row items-center gap-2 sm:gap-5'>
				<CoinAndValueInput
					cryptoList={cryptoList}
					selectedCrypto={selectedCrypto}
					setSelectedCrypto={setSelectedCrypto}
				/>
				<button
					type='button'
					className='flex items-center justify-center w-10 h-10 aspect-square bg-main rounded-full p-2 hover:cursor-pointer hover:bg-second transition-colors duration-300 z-[5]'
					onClick={() => {
						const temp = selectedCrypto;
						setSelectedCrypto(secondSelectedCrytpo);
						setSecondSelectedCrypto(temp);
					}}
				>
					<BsArrowDownUp className='text-white font-bold text-xl sm:rotate-90' />
				</button>
				<CoinAndValueInput
					cryptoList={cryptoList}
					selectedCrypto={secondSelectedCrytpo}
					setSelectedCrypto={setSecondSelectedCrypto}
					disabled
				/>
			</div>
			<p className='font-medium text-xl sm:text-xl flex flex-col gap-1 '>
				1 {selectedCrypto.symbol} ≈{' '}
				{selectedCrypto.price / secondSelectedCrytpo.price > 0
					? parseFloat(
							(selectedCrypto.price / secondSelectedCrytpo.price).toFixed(10)
					  ).toString()
					: '0'}{' '}
				{secondSelectedCrytpo.symbol}{' '}
				<span className='text-gray-600 font-normal text-xs sm:text-sm text-nowrap'>
					Ostatnia aktualizacja: 08:56AM UTC 04.06.2024
				</span>
			</p>
		</div>
	);
}
