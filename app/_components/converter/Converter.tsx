'use client';

import {
	ConverterAssetDetails,
	useConvertAssetsQuery,
} from '@/app/_redux/features/globalApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import { useState } from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import CoinAndValueInput from './CoinAndValueInput';
import { useDebounce } from '@/app/_hook/useDebounce';

export default function Converter() {
	const [selectedAsset, setSelectedAsset] = useState<ConverterAssetDetails>();
	const [secondSelectedAsset, setSeconSelectedAsset] =
		useState<ConverterAssetDetails>();
	const [amount, setAmount] = useState<number | string>(1);
	const deboundedAmount = useDebounce(amount, 500);
	const { data, isLoading } = useConvertAssetsQuery(
		{
			convert_from: selectedAsset?.symbol ?? '',
			convert_to: secondSelectedAsset?.symbol ?? '',
			amount: Number(deboundedAmount) || 1,
		},
		{
			skip: !selectedAsset || !secondSelectedAsset,
		}
	);

	return (
		<div className=' flex flex-col gap-5 rounded-lg sm:border border-grayThird sm:shadow-md sm:bg-white sm:p-5 w-full'>
			<div className='relative flex flex-col md:flex-row items-center gap-5'>
				<CoinAndValueInput
					selectedAsset={selectedAsset}
					setSelectedAsset={setSelectedAsset}
					amount={amount}
					setAmount={setAmount}
				/>

				<button
					type='button'
					className='flex items-center justify-center w-10 h-10 aspect-square bg-main rounded-full p-2 hover:cursor-pointer hover:bg-second transition-colors duration-300 z-[5]'
					onClick={() => {
						const temp = selectedAsset;
						setSelectedAsset(secondSelectedAsset);
						setSeconSelectedAsset(temp);
					}}
				>
					<BsArrowDownUp className='text-white font-bold text-xl sm:rotate-90' />
				</button>
				<CoinAndValueInput
					selectedAsset={secondSelectedAsset}
					setSelectedAsset={setSeconSelectedAsset}
					amount={data?.converted_amount}
					disabled
				/>
			</div>
			{isLoading || !data ? (
				<div className='h-[28px] w-40 shimmer rounded-md' />
			) : (
				<p className='font-medium text-xl sm:text-xl flex flex-col gap-1 '>
					{deboundedAmount || 1} {selectedAsset?.symbol.toUpperCase()} ≈{' '}
					{formatFullPrice(data?.converted_amount, false)}{' '}
					{secondSelectedAsset?.symbol.toUpperCase()}{' '}
				</p>
			)}
		</div>
	);
}
