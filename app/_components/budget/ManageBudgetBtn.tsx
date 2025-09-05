import { Budget } from '@/app/_redux/features/budgetApiSlice';
import { useState } from 'react';
import { BsFillPencilFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FaBrush, FaTrashAlt } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuElement from '../DropdownMenuElement';
import Modal from '../Modal';
import DeleteAllTransactionsModal from './DeleteAllTransactionsModal';
import DeleteBudgetModal from './DeleteBudgetModal';
import ModifyBudgetModal from './ManageBudgetModal';

interface ManageBudgetBtnProps {
	budget?: Budget;
	isLoading: boolean;
}
export default function ManageBudgetBtn({
	budget,
	isLoading,
}: ManageBudgetBtnProps) {
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
								onClick={() => setIsExtended(false)}
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
							<DropdownMenuElement
								icon={<FaTrashAlt />}
								text='Usuń budżet'
								onClick={() => setIsExtended(false)}
							/>
						</Modal.Open>
						<Modal.Window name='deleteBudget'>
							<DeleteBudgetModal
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
								onClick={() => setIsExtended(false)}
							/>
						</Modal.Open>
						<Modal.Window name='deleeteTransactions'>
							<DeleteAllTransactionsModal
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
