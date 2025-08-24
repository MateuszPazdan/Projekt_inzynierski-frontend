import { Crypto, Stock } from '@/app/_redux/features/marketApiSlice';
import { formatFullPrice } from '@/app/_utils/formatAmountOfMoney';
import Image from 'next/image';
import PriceChange from './PriceChange';
import Link from 'next/link';

export default function AssetListCard({
	title,
	assetList,
	limit,
	isLoading,
	assetType,
}: {
	title: string;
	assetList?: Crypto[] | Stock[];
	limit: number;
	isLoading?: boolean;
	assetType: 'crypto' | 'stock';
}) {
	if (isLoading)
		return (
			<div className='grid grid-rows-[auto_auto] gap-1 rounded-lg border border-gray-300 shadow-md bg-white p-3 px-4'>
				<p className='text-gray-600 font-medium pb-2'>{title}</p>

				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className='grid grid-cols-[1fr_auto] gap-1 text-sm p-2 rounded-md hover:bg-gray-100'
					>
						<div className='flex flex-row items-center gap-2'>
							<div className='h-4 w-4 rounded shimmer' />
							<div className='h-4 w-1/2 rounded shimmer' />
						</div>

						<div className='flex items-start flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse'>
							<div className='h-4 w-5 rounded shimmer' />
							<div className='h-4 w-10 rounded shimmer' />
						</div>
					</div>
				))}
			</div>
		);
	return (
		<div className='grid grid-rows-[1fr_auto] gap-1 rounded-lg border border-gray-300 shadow-md bg-white p-3 px-4'>
			<p className='text-gray-600 font-medium pb-2'>{title}</p>

			{assetList?.slice(0, limit).map((asset) => (
				<Link
					href={`/market/${assetType === 'crypto' ? 'crypto' : 'stocks'}/${
						asset.symbol
					}`}
					key={asset.name}
					className='grid grid-cols-[1fr_auto] gap-1 text-sm p-2 rounded-md hover:bg-grayOne transition-colors duration-300'
				>
					<div className='flex flex-row items-center gap-2'>
						{'icon' in asset && asset.icon ? (
							<Image src={asset.icon} alt={asset.name} width={24} height={24} />
						) : (
							<p
								className={`flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full`}
							>
								{asset?.name.trimStart().charAt(0).toUpperCase()}
							</p>
						)}
						<p className='font-medium truncate'>{asset.name}</p>
					</div>

					<div className='flex sm:items-center flex-col-reverse sm:flex-row gap-2 justify-end flex-wrap-reverse'>
						<PriceChange change={asset.price_change_percentage_24h} />
						<p className='font-medium'>{formatFullPrice(asset.price, 2)}</p>
					</div>
				</Link>
			))}
		</div>
	);
}
