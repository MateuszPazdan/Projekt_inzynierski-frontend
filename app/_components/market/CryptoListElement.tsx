'use client';

import Image from 'next/image';
import { PiStar } from 'react-icons/pi';
import { thStyles } from './CryptoList';
import { useRouter } from 'next/navigation';

export default function CryptoListElement() {
	const router = useRouter();

	function handleNavigate() {
		router.push('/market/crypto/asset');
	}

	function hadnleClick(e: React.MouseEvent) {
		e.stopPropagation();
		console.log('favorite clicked');
	}

	return (
		<tr
			onClick={() => handleNavigate()}
			className='hover:bg-grayOne transition-colors duration-300 hover:cursor-pointer'
		>
			<td className={`${thStyles} pl-2 md:pl-5`}>
				<button
					onClick={hadnleClick}
					className='text-xl p-2 hover:bg-graySecond transition-colors duration-300  rounded-lg'
				>
					<PiStar />
				</button>
			</td>
			<td className={`${thStyles} text-center`}>1</td>
			<td className={`${thStyles} flex flex-row items-center gap-2`}>
				<Image
					alt='crypto-logo'
					src={'/bitcoin-logo-svgrepo-com.svg'}
					width={28}
					height={28}
				/>
				<p className='flex flex-col items-start'>
					<span>Bitcoin</span>
					<span className='text-sm text-gray-700'>BTC</span>
				</p>
			</td>
			<td className={`${thStyles}`}>117 PLN</td>
			<td className={`${thStyles}`}>0.4%</td>
			<td className={`${thStyles}`}>2.3%</td>
			<td className={`${thStyles}`}>3%</td>
			<td className={`${thStyles}`}>76 835 123 PLN</td>
			<td className={`${thStyles} pr-2 md:pr-5`}>3 876 835 123 PLN</td>
		</tr>
	);
}
