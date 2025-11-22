import { Budget } from '@/app/_redux/features/budgetApiSlice';
import { useState } from 'react';
import { BsFillPencilFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FaBrush, FaTrashAlt } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuElement from '../DropdownMenuElement';
import Modal from '../Modal';
import BudgetDeleteAllTransactionsModal from './BudgetDeleteAllTransactionsModal';
import BudgetDeleteModal from './BudgetDeleteModal';
import ModifyBudgetModal from './BudgetManageModal';

interface BudgetManageBtnProps {
	budget?: Budget;
	isLoading: boolean;
}
export default function BudgetManageBtn({
	budget,
	isLoading,
}: BudgetManageBtnProps) {
	const [isExtended, setIsExtended] = useState(false);

	return (
		<DropdownMenu
			openIcon={<BsThreeDotsVertical />}
			isExtended={isExtended}
			setIsExtended={setIsExtended}
			disabled={isLoading}
		>
			{!isLoading && budget && (
				<>
					<Modal>
						<Modal.Open opens='modifyBudget'>
							<DropdownMenuElement
								icon={<BsFillPencilFill />}
								text='Modyfikuj budżet'
							/>
						</Modal.Open>
						<Modal.Window name='modifyBudget'>
							<ModifyBudgetModal
								onCloseModal={() => undefined}
								budget={budget}
							/>
						</Modal.Window>
					</Modal>
					<Modal>
						<Modal.Open opens='deleteBudget'>
							<DropdownMenuElement icon={<FaTrashAlt />} text='Usuń budżet' />
						</Modal.Open>
						<Modal.Window name='deleteBudget'>
							<BudgetDeleteModal
								onCloseModal={() => undefined}
								budget={budget}
							/>
						</Modal.Window>
					</Modal>
					<Modal>
						<Modal.Open opens='deleeteTransactions'>
							<DropdownMenuElement
								icon={<FaBrush />}
								text='Wyczyść transakcje'
							/>
						</Modal.Open>
						<Modal.Window name='deleeteTransactions'>
							<BudgetDeleteAllTransactionsModal
								onCloseModal={() => undefined}
								budget={budget}
							/>
						</Modal.Window>
					</Modal>
				</>
			)}
		</DropdownMenu>
	);
}
