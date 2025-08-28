import { BsFillPencilFill, BsSliders2 } from 'react-icons/bs';
import Modal from '../Modal';
import ModifyBudgetModal from './ManageBudgetModal';
import { Budget } from '@/app/_redux/features/budgetApiSlice';
import { FaBrush, FaTrashAlt } from 'react-icons/fa';
import DeleteAllTransactionsModal from './DeleteAllTransactionsModal';
import DeleteBudgetModal from './DeleteBudgetModal';
import DropdownMenu from '../DropdownMenu';
import { useState } from 'react';

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
			openIcon={<BsSliders2 />}
			isExtended={isExtended}
			setIsExtended={setIsExtended}
			disabled={isLoading}
		>
			{!isLoading && budget && (
				<>
					<Modal>
						<Modal.Open opens='modifyBudget'>
							<button
								className='px-3 py-3 w-full flex flex-row gap-2 items-center text-gray-600 hover:text-black hover:bg-grayOne transition-colors duration-300'
								onClick={() => setIsExtended(false)}
							>
								<BsFillPencilFill />
								Modyfikuj budżet
							</button>
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
							<button
								className='px-3 py-3 w-full flex flex-row gap-2 items-center text-gray-600 hover:text-black hover:bg-grayOne transition-colors duration-300'
								onClick={() => setIsExtended(false)}
							>
								<FaTrashAlt />
								Usuń budżet
							</button>
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
							<button
								className='px-3 py-3 w-full flex flex-row gap-2 items-center text-gray-600 hover:text-black hover:bg-grayOne transition-colors duration-300'
								onClick={() => setIsExtended(false)}
							>
								<FaBrush />
								Wyczyść transakcje
							</button>
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
