import ModalHeader from '../ModalHeader';

interface CreateBudgetModalProps {
	onCloseModal: () => void;
}

export default function CreateBudgetModal({
	onCloseModal,
}: CreateBudgetModalProps) {
	return (
		<div>
			<ModalHeader title='Tworzenie budżetu' onCloseModal={onCloseModal} />
		</div>
	);
}
