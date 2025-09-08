import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaBrush, FaTrashAlt } from 'react-icons/fa';
import DropdownMenu from '../../DropdownMenu';
import DropdownMenuElement from '../../DropdownMenuElement';
import Modal from '../../Modal';

interface ManageAssetTransactionsBtnProps {
	portfolioId: string;
	assetSymbol: string;
	isLoading: boolean;
	assetType: 'crypto' | 'stock';
}
export default function ManageAssetTransactionsBtn({
	portfolioId,
	assetSymbol,
	isLoading,
	assetType,
}: ManageAssetTransactionsBtnProps) {
	const [isExtended, setIsExtended] = useState(false);

	return (
		<DropdownMenu
			openIcon={<BsThreeDotsVertical />}
			isExtended={isExtended}
			setIsExtended={setIsExtended}
			disabled={isLoading}
		>
			{!isLoading && (
				<>
					<Modal>
						<Modal.Open opens='deleteAsset'>
							<DropdownMenuElement
								icon={<FaTrashAlt />}
								text={`Usuń ${
									assetType === 'crypto' ? 'kryptowalutę' : 'akcję'
								} `}
								onClick={() => setIsExtended(false)}
							/>
						</Modal.Open>
						<Modal.Window name='deleteAsset'>
							<div>Delete asset</div>
						</Modal.Window>
					</Modal>
					<Modal>
						<Modal.Open opens='deleteCurrentAssetTransactions'>
							<DropdownMenuElement
								icon={<FaBrush />}
								text='Wyczyść transakcje'
								onClick={() => setIsExtended(false)}
							/>
						</Modal.Open>
						<Modal.Window name='deleteCurrentAssetTransactions'>
							<div>Wyczyść transakcje</div>
						</Modal.Window>
					</Modal>
				</>
			)}
		</DropdownMenu>
	);
}
