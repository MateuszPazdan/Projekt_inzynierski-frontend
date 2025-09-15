'use client';

import { BsPlus } from 'react-icons/bs';
import Button from '../../Button';
import Modal from '../../Modal';
import SectionHeader from '../../SectionHeader';
import ManagePortfolioModal from '../ManagePortfolioModal';

export default function StockPortfolioHeader() {
	return (
		<div className='flex flex-col justify-between items-start sm500:flex-row sm500:items-center gap-4'>
			<SectionHeader title='Twoje portfele akcyjne' size='small' />
			<Modal>
				<Modal.Open opens='createStockPortfolio'>
					<Button size={`small`}>
						<span className='text-3xl'>
							<BsPlus />
						</span>
						<span className='pr-3'>Dodaj portfolio</span>
					</Button>
				</Modal.Open>
				<Modal.Window name='createStockPortfolio'>
					<ManagePortfolioModal
						onCloseModal={() => undefined}
						portfolioType='stocks'
					/>
				</Modal.Window>
			</Modal>
		</div>
	);
}
