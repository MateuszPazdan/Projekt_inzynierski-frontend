'use client';

import Button from '../Button';
import Modal from '../Modal';
import DeleteAccountModal from './DeleteAccountModal';

export default function DeleteAccount() {
	return (
		<div className='pt-5'>
			<Modal>
				<Modal.Open opens='deleteAccount'>
					<Button color='danger' size='small'>
						Usuń konto
					</Button>
				</Modal.Open>
				<Modal.Window name='deleteAccount'>
					<DeleteAccountModal onCloseModal={() => undefined} />
				</Modal.Window>
			</Modal>
		</div>
	);
}
