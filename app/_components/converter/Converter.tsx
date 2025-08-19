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
		<div className=' flex flex-col gap-4 rounded-lg border border-grayThird shadow-md bg-white p-5 px-5  max-w-[500px] w-full'>
			<div className='relative flex flex-col gap-4'>
				<CoinAndValueInput
					cryptoList={cryptoList}
					selectedCrypto={selectedCrypto}
					setSelectedCrypto={setSelectedCrypto}
				/>
				<button
					type='button'
					className='flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-main border-[5px] border-white rounded-full p-2 hover:cursor-pointer hover:bg-second transition-colors duration-300 z-[5]'
					onClick={() => {
						const temp = selectedCrypto;
						setSelectedCrypto(secondSelectedCrytpo);
						setSecondSelectedCrypto(temp);
					}}
				>
					<BsArrowDownUp className='text-white font-bold text-xl' />
				</button>
				<CoinAndValueInput
					cryptoList={cryptoList}
					selectedCrypto={secondSelectedCrytpo}
					setSelectedCrypto={setSecondSelectedCrypto}
					disabled
				/>
			</div>
			<p className='text-center text-sm text-gray-600'>
				1 {selectedCrypto.symbol} ≈{' '}
				{selectedCrypto.price / secondSelectedCrytpo.price > 0
					? parseFloat(
							(selectedCrypto.price / secondSelectedCrytpo.price).toFixed(10)
					  ).toString()
					: '0'}{' '}
				{secondSelectedCrytpo.symbol}
			</p>
			{/* <Button size='small'>Uzyskaj wycenę</Button> */}
		</div>
	);
}
