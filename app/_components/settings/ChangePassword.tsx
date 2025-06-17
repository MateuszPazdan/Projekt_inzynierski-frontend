'use client';

import Button from '../Button';
import Modal from '../Modal';
import ChangePasswordModal from './ChangePasswordModal';

export default function ChangePassword() {
	return (
		<div className='pt-5'>
			<Modal>
				<Modal.Open opens='changePassword'>
					<Button color='light' size='small'>
						Zmień hasło
					</Button>
				</Modal.Open>
				<Modal.Window name='changePassword'>
					<ChangePasswordModal onCloseModal={() => undefined} />
				</Modal.Window>
			</Modal>
		</div>
	);
}
