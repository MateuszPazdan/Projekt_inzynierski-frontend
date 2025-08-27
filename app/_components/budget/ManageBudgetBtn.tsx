import { BsFillPencilFill, BsSliders2 } from 'react-icons/bs';
import Button from '../Button';
import { useRef, useState } from 'react';
import Modal from '../Modal';
import ModifyBudgetModal from './ManageBudgetModal';
import { Budget } from '@/app/_redux/features/budgetApiSlice';
import { useClickOutside } from '@/app/_hook/useClickOutside';
import { FaBrush, FaTrashAlt } from 'react-icons/fa';
import DeleteAllTransactionsModal from './DeleteAllTransactionsModal';
import DeleteBudgetModal from './DeleteBudgetModal';

interface ManageBudgetBtnProps {
	budget?: Budget;
	isLoading: boolean;
}
export default function ManageBudgetBtn({
	budget,
	isLoading,
}: ManageBudgetBtnProps) {
	const [isExtended, setIsExtended] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const closeModal = () => {
		setIsExtended(false);
	};

	useClickOutside(dropdownRef, closeModal, buttonRef);

	return (
		<div className='relative flex' ref={buttonRef}>
			<Button
				size='icon'
				color='light'
				onClick={() => setIsExtended((isExtended) => !isExtended)}
				disabled={isLoading}
			>
				<BsSliders2 />
			</Button>
			{!isLoading && budget && (
				<div
					ref={dropdownRef}
					className={`absolute  rounded-md border  border-grayThird shadow-md bg-white left-0 md:left-auto md:right-0 top-[110%] text-nowrap ${
						isExtended ? 'flex' : 'hidden'
					} flex-col text-sm overflow-hidden`}
				>
					<Modal>
						<Modal.Open opens='modifyBudget'>
							<button
								className='px-3 py-3 w-full flex flex-row gap-2 items-center text-gray-600 hover:text-black hover:bg-grayOne transition-colors duration-300'
								onClick={() => closeModal()}
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
								onClick={() => closeModal()}
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
								onClick={() => closeModal()}
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
				</div>
			)}
		</div>
	);
}
