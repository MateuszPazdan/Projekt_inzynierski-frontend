'use client';

import Image from 'next/image';
import { BsArrowDownUp } from 'react-icons/bs';
import Button from '../Button';
import { useState } from 'react';

const cryptoList = [
	{
		name: 'Bitcoin',
		symbol: 'BTC',
		logo: '/bitcoin-logo-svgrepo-com.svg',
	},
	{
		name: 'Ethereum',
		symbol: 'ETH',
		logo: '/ethereum-logo-svgrepo-com.svg',
	},
];

export default function Converter() {
	const [selectedCrytpo, setSelectedCrypto] = useState(cryptoList[0]);
	const [SecondSelectedCrytpo, setSecondSelectedCrypto] = useState(
		cryptoList[1]
	);
	return (
		<div className=' flex flex-col gap-8 rounded-lg border border-grayThird shadow-md bg-white p-8 px-5  max-w-[500px] w-full'>
			<div className='relative flex flex-col gap-4'>
				<div className=' flex flex-row gap-1 items-center p-2 bg-grayOne border-grayThird border rounded-md'>
					<div className='flex flex-row items-center gap-2'>
						<Image
							src={selectedCrytpo.logo}
							alt={selectedCrytpo.name}
							width={24}
							height={24}
						/>
						<p className='flex flex-col justify-center'>
							<span className='text-sm font-semibold'>
								{selectedCrytpo.symbol}
							</span>
							<span className='text-xs text-gray-500'>
								{selectedCrytpo.name}
							</span>
						</p>
					</div>
					<input
						placeholder='0.00'
						min={0}
						step={0.000001}
						type='number'
						className='p-2 text-right bg-transparent outline-none appearance-none m-0 ml-5 w-full'
					/>
				</div>
				<div className='flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-main border-[5px] border-white rounded-full p-2'>
					<BsArrowDownUp className='text-white font-bold text-xl' />
				</div>
				<div className='flex flex-row gap-1 items-center p-2 bg-grayOne border-grayThird border rounded-md'>
					<Image
						src={SecondSelectedCrytpo.logo}
						alt={SecondSelectedCrytpo.name}
						width={24}
						height={24}
					/>
					<input
						defaultValue={0.000001}
						placeholder='0.00'
						min={0}
						step={0.000001}
						type='number'
						className='w-full p-2 text-right bg-transparent outline-none appearance-none m-0'
					/>
				</div>
			</div>
			<Button size='small'>Uzyskaj wycenę</Button>
		</div>
	);
}
