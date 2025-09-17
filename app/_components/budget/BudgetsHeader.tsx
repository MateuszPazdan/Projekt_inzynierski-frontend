'use client';

import { BsPlus } from 'react-icons/bs';
import Button from '../Button';
import Modal from '../Modal';
import BudgetManageModal from './BudgetManageModal';
import SectionHeader from '../SectionHeader';

export default function BudgetsHeader() {
	return (
		<div className='flex flex-col justify-between items-start sm500:flex-row sm500:items-center gap-4 pb-10'>
			<SectionHeader
				title='Przegląd budżetów'
				description='Śledź swoje przychody i wydatki oraz zarządzaj swoim budżetem.'
			/>
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
					<BudgetManageModal onCloseModal={() => undefined} />
				</Modal.Window>
			</Modal>
		</div>
	);
}
