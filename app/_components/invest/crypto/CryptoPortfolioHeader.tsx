'use client';

import { BsPlus } from 'react-icons/bs';
import Button from '../../Button';
import Modal from '../../Modal';
import SectionHeader from '../../SectionHeader';
import ManagePortfolioModal from '../ManagePortfolioModal';

export default function CryptoPortfolioHeader() {
	return (
		<div className='flex flex-col justify-between items-start sm500:flex-row sm500:items-center gap-4'>
			<SectionHeader title='Twoje portfele kryptowalutowe' size='small' />
			<Modal>
				<Modal.Open opens='createCryptoPortfolio'>
					<Button size={`small`}>
						<span className='text-3xl'>
							<BsPlus />
						</span>
						<span className='pr-3'>Dodaj portfolio</span>
					</Button>
				</Modal.Open>
				<Modal.Window name='createCryptoPortfolio'>
					<ManagePortfolioModal
						onCloseModal={() => undefined}
						assetType='crypto'
					/>
				</Modal.Window>
			</Modal>
		</div>
	);
}
