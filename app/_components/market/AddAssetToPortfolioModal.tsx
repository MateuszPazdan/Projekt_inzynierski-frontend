'use client';

import {
	PortfolioHoldingCryptoInfo,
	useAddWatchedCryptoPortfolioMutation,
	useRetrievePortfoliosHoldingCryptoQuery,
} from '@/app/_redux/features/portfiolioApiSlice';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { BsCheck, BsPlus, BsX } from 'react-icons/bs';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import DeleteWatchedAssetModal from '../invest/DeleteWatchedAssetModal';
import { useState } from 'react';

interface AddAssetToPortfolioModalProps {
	onCloseModal: () => void;
	assetSymbol: string;
	assetType: 'crypto' | 'stock';
}

export default function AddAssetToPortfolioModal({
	onCloseModal,
	assetSymbol,
	assetType,
}: AddAssetToPortfolioModalProps) {
	const {
		data: portfoliosHoldingCrypto,
		isLoading: isPortfoliosHoldingCryptoLoading,
		isFetching: isPortfoliosHoldingCryptoFetching,
	} = useRetrievePortfoliosHoldingCryptoQuery(
		{ symbol: assetSymbol },
		{ skip: assetType !== 'crypto' }
	);
	const [addWatchedCrypto, { isLoading: isAddwatchedCryptoLoading }] =
		useAddWatchedCryptoPortfolioMutation();

	function handleAddAssetToPortfolio({
		portfolio,
	}: {
		portfolio: PortfolioHoldingCryptoInfo;
	}) {
		if (assetType === 'crypto') {
			addWatchedCrypto({
				portfolioId: portfolio.id,
				crypto_symbol: assetSymbol,
			})
				.unwrap()
				.then(() => {
					toast.success(
						`Dodano kryptowalutę ${assetSymbol.toUpperCase()} do portfolio.`
					);
				})
				.catch((error) => {
					toast.error(
						error?.data.detail ||
							`Wystąpił błąd podczas dodawania kryptowaluty ${assetSymbol.toUpperCase()} do portfolio.`
					);
				});
		}
	}

	return (
		<div>
			<ModalHeader onCloseModal={onCloseModal} title='Dodaj do portfela' />

			<div className='pt-5'>
				{isPortfoliosHoldingCryptoLoading || isPortfoliosHoldingCryptoFetching
					? Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className='flex flex-row h-[54px] gap-2 items-center '
							>
								<div className='h-[24px] w-[24px] rounded shimmer' />
								<div className='h-[20px] w-[70px] rounded-md shimmer' />
							</div>
					  ))
					: portfoliosHoldingCrypto?.map((portfolio, index) => (
							<>
								{portfolio.in_portfolio ? (
									<RemoveAssetBtn
										assetSymbol={assetSymbol}
										portfolio={portfolio}
										key={index}
									/>
								) : (
									<button
										className='grid grid-cols-[1fr_auto] gap-1 text-sm p-3 rounded-md hover:bg-grayOne disabled:hover:bg-white transition-colors duration-300 w-full group'
										onClick={() => handleAddAssetToPortfolio({ portfolio })}
										disabled={isAddwatchedCryptoLoading}
										key={index}
									>
										<div className='flex flex-row items-center gap-2'>
											<p className='flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full'>
												{portfolio.title.trimStart().charAt(0).toUpperCase()}
											</p>
											<p className='font-medium truncate'>{portfolio.title}</p>
										</div>
										<span>
											<BsPlus className='text-3xl group-hover:text-green-500 transition-colors duration-300' />
										</span>
									</button>
								)}
							</>
					  ))}
			</div>
		</div>
	);
}

function RemoveAssetBtn({
	portfolio,
	assetSymbol,
}: {
	portfolio: PortfolioHoldingCryptoInfo;
	assetSymbol: string;
}) {
	const [hovered, setHovered] = useState(false);
	return (
		<Modal>
			<Modal.Open opens='deleteAssetFromPortfolio'>
				<button
					className='grid grid-cols-[1fr_auto] gap-1 text-sm p-3 rounded-md hover:bg-grayOne disabled:hover:bg-white transition-colors duration-300 w-full group'
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<div className='flex flex-row items-center gap-2'>
						<p className='flex items-center justify-center w-6 h-6 text-xs aspect-square bg-main text-white rounded-full'>
							{portfolio?.title.trimStart().charAt(0).toUpperCase()}
						</p>
						<p className='font-medium truncate'>{portfolio?.title}</p>
					</div>

					<AnimatePresence mode='wait'>
						{hovered ? (
							<motion.span
								key='x-icon'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.1 }}
								className='text-red-500 text-3xl'
							>
								<BsX />
							</motion.span>
						) : (
							<motion.span
								key='check-icon'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.15, delay: 0.1 }}
								className='text-green-500 text-3xl'
							>
								<BsCheck />
							</motion.span>
						)}
					</AnimatePresence>
				</button>
			</Modal.Open>
			<Modal.Window name='deleteAssetFromPortfolio'>
				<DeleteWatchedAssetModal
					skipRedirect
					assetSymbol={assetSymbol}
					assetType='crypto'
					onCloseModal={() => undefined}
					portfolioId={portfolio?.id}
				/>
			</Modal.Window>
		</Modal>
	);
}
