'use client'

import { FaExchangeAlt } from 'react-icons/fa';
import Button from './_components/Button';
import { motion } from 'framer-motion';

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
				className='bg-white p-12 rounded-2xl shadow-2xl max-w-lg text-center'
			>
				<FaExchangeAlt className='text-6xl text-blue-600 mb-6 animate-spin-slow mx-auto' />
				<h1 className='text-4xl font-extrabold mb-4 text-gray-800'>
					Seamless Crypto Conversion
				</h1>
				<p className='text-gray-600 mb-8 text-lg'>
					Effortlessly exchange your favorite cryptocurrencies with the best
					rates and zero hassle.
				</p>
				<Button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-md transition-transform hover:scale-105'>
					Start Converting
				</Button>
			</motion.div>
		</div>
	);
}
