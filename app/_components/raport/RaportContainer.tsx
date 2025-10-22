'use client';

import { useState } from 'react';
import { FaBitcoin, FaChartArea } from 'react-icons/fa6';
import Button from '../Button';
import {
	useGenerateCryptoPortfolioReportMutation,
	useGenerateStockPortfolioReportMutation,
} from '@/app/_redux/features/portfiolioApiSlice';

type ReportType = 'crypto' | 'stocks';

export default function RaportContainer() {
	const [reportType, setReportType] = useState<ReportType>('crypto');
	const [
		generateCryptoPortfolioReport,
		{ isLoading: isGenerateCryptoPortfolioReportLoading },
	] = useGenerateCryptoPortfolioReportMutation();
	const [
		generateStockoPortfolioReport,
		{ isLoading: isGenerateStockPortfolioReportLoading },
	] = useGenerateStockPortfolioReportMutation();

	function handleGenerateReport() {
		if (reportType === 'crypto') {
			generateCryptoPortfolioReport();
		} else if (reportType === 'stocks') {
			generateStockoPortfolioReport();
		}
	}

	return (
		<div className=' flex flex-col gap-5 rounded-lg sm:border border-grayThird sm:shadow-md sm:bg-white sm:p-5 w-full'>
			<p className='text-gray-600 font-medium'>Wybierz typ raportu</p>
			<button
				className={`flex flex-row gap-3 items-center px-3 py-2 bg-white border-grayThird border rounded-md transition-colors duration-300 ${
					reportType === 'crypto' ? '  border-main' : ''
				}`}
				onClick={() => setReportType('crypto')}
				disabled={
					isGenerateCryptoPortfolioReportLoading ||
					isGenerateStockPortfolioReportLoading
				}
			>
				<FaBitcoin className='text-2xl' />
				<div className='text-left'>
					<p className='font-medium'>Inwestycje w kryptowaluty</p>
					<p className='text-sm text-gray-600'>
						Wygeneruj raport w formacie PDF zawierający podsumowanie inwestycji
						w kryptowaluty.
					</p>
				</div>
			</button>
			<button
				className={`flex flex-row gap-3 items-center px-3 py-2 bg-white border-grayThird border rounded-md transition-colors duration-300 ${
					reportType === 'stocks' ? '  border-main' : ''
				}`}
				onClick={() => setReportType('stocks')}
				disabled={
					isGenerateCryptoPortfolioReportLoading ||
					isGenerateStockPortfolioReportLoading
				}
			>
				<FaChartArea className='text-2xl' />
				<div className='text-left'>
					<p className='font-medium'>Inwestycje w akcje</p>
					<p className='text-sm text-gray-600'>
						Wygeneruj raport w formacie PDF zawierający podsumowanie inwestycji
						w akcje.
					</p>
				</div>
			</button>
			<div className='mx-auto mt-3'>
				<Button
					onClick={() => handleGenerateReport()}
					isLoading={
						isGenerateCryptoPortfolioReportLoading ||
						isGenerateStockPortfolioReportLoading
					}
					type='button'
				>
					Generuj raport
				</Button>
			</div>
		</div>
	);
}
