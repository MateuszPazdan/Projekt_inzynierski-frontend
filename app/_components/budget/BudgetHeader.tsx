'use client';

import { BsPlus } from 'react-icons/bs';
import Button from '../Button';
import Modal from '../Modal';
import CreateBudgetModal from './CreateBudgetModal';
import { useEffect, useState } from 'react';

export default function BudgetHeader() {
	const [windowWidth, setWindowWidth] = useState<number | null>(null);

	useEffect(() => {
		// Ustawiamy szerokość tylko po stronie klienta
		setWindowWidth(window.innerWidth);

		// (opcjonalnie) aktualizacja przy zmianie rozmiaru
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className='flex flex-col justify-between items-left sm500:flex-row sm500:items-center gap-2 pb-10'>
			<p className='text-blackOne text-center text-3xl md:text-3xl lg:text-4xl'>
				Przegląd budżetów
			</p>
			<Modal>
				<Modal.Open opens='createBudget'>
					<Button
						size={`${
							windowWidth !== null && windowWidth >= 768 ? 'large' : 'small'
						}`}
					>
						<span className='text-3xl'>
							<BsPlus />
						</span>
						<span className='pr-3'>Dodaj budżet</span>
					</Button>
				</Modal.Open>
				<Modal.Window name='createBudget'>
					<CreateBudgetModal onCloseModal={() => undefined} />
				</Modal.Window>
			</Modal>
		</div>
	);
}
