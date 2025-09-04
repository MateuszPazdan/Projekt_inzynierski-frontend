import { PortfolioInfo } from '@/app/_redux/features/portfiolioApiSlice';
import { useState } from 'react';
import { BsFillPencilFill, BsSliders2 } from 'react-icons/bs';
import { FaBrush, FaTrashAlt } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu';
import Modal from '../Modal';
import DeletePortfolioModal from './DeletePortfolioModal';
import DeletePortfolioTransactionsModal from './DeletePortfolioTransactionsModal';
import ManagePortfolioModal from './ManagePortfolioModal';
import DropdownMenuElement from '../DropdownMenuElement';

interface ManagePortfolioBtnProps {
	portfolio?: PortfolioInfo;
	isLoading: boolean;
	portfolioType: 'crypto' | 'stocks';
}
export default function ManagePortfolioBtn({
	portfolio,
	isLoading,
}: ManagePortfolioBtnProps) {
	const [isExtended, setIsExtended] = useState(false);

	return (
		<DropdownMenu
			openIcon={<BsSliders2 />}
			isExtended={isExtended}
			setIsExtended={setIsExtended}
			disabled={isLoading}
		>
			{!isLoading && portfolio && (
				<>
					<Modal>
						<Modal.Open opens='modifyPortfolio'>
							<DropdownMenuElement
								icon={<BsFillPencilFill />}
								text='Modyfikuj portfolio'
								onClick={() => setIsExtended(false)}
							/>
						</Modal.Open>
						<Modal.Window name='modifyPortfolio'>
							<ManagePortfolioModal
								onCloseModal={() => undefined}
								portfolio={portfolio}
								portfolioType='crypto'
							/>
						</Modal.Window>
					</Modal>
					<Modal>
						<Modal.Open opens='deletePortfolio'>
							<DropdownMenuElement
								icon={<FaTrashAlt />}
								text='Usuń portfolio'
								onClick={() => setIsExtended(false)}
							/>
						</Modal.Open>
						<Modal.Window name='deletePortfolio'>
							<DeletePortfolioModal
								onCloseModal={() => undefined}
								portfolioId={portfolio.id}
								portfolioType='crypto'
							/>
						</Modal.Window>
					</Modal>
					<Modal>
						<Modal.Open opens='deleteTransactions'>
							<DropdownMenuElement
								icon={<FaBrush />}
								text='Wyczyść transakcje'
								onClick={() => setIsExtended(false)}
							/>
						</Modal.Open>
						<Modal.Window name='deleteTransactions'>
							<DeletePortfolioTransactionsModal
								onCloseModal={() => undefined}
								portfolioId={portfolio.id}
								portfolioType='crypto'
							/>
						</Modal.Window>
					</Modal>
				</>
			)}
		</DropdownMenu>
	);
}
