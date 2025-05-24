import { BsX } from 'react-icons/bs';

interface Props {
	onCloseModal: () => void;
	title?: string;
}

export default function ModalHeader({ onCloseModal, title }: Props) {
	return (
		<div className='flex flex-row justify-between w-full items-center '>
			<p className='flex justify-center items-center text-xl sm600:text-2xl font-normal'>
				{title}
			</p>
			<button
				className='text-4xl p-1 sm600:p-2 self-end rounded-lg hover:bg-grayOne duration-300 transition'
				onClick={onCloseModal}
			>
				<BsX />
			</button>
		</div>
	);
}
