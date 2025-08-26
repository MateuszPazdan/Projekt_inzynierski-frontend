'use client';

import { BsPlus } from 'react-icons/bs';
import Button from '../Button';
import Modal from '../Modal';
import ManageBudgetModal from './ManageBudgetModal';

export default function BudgetsHeader() {
	return (
		<div className='flex flex-col justify-between items-start sm500:flex-row sm500:items-center gap-4 pb-10'>
			<p className='text-blackOne text-center text-3xl md:text-3xl lg:text-4xl'>
				Przegląd budżetów
			</p>
			<Modal>
				<Modal.Open opens='createBudget'>
					<Button size={`small`}>
						<span className='text-3xl'>
							<BsPlus />
						</span>
						<span className='pr-3'>Dodaj budżet</span>
					</Button>
				</Modal.Open>
				<Modal.Window name='createBudget'>
					<ManageBudgetModal onCloseModal={() => undefined} />
				</Modal.Window>
			</Modal>
		</div>
	);
}
