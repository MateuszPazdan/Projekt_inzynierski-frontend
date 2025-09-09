import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaBrush, FaTrashAlt } from 'react-icons/fa';
import DropdownMenu from '../../DropdownMenu';
import DropdownMenuElement from '../../DropdownMenuElement';
import Modal from '../../Modal';
import DeletePortfolioTransactionsModal from '../DeletePortfolioTransactionsModal';
import DeleteWatchedAssetModal from '../DeleteWatchedAssetModal';

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
							<DeleteWatchedAssetModal
								onCloseModal={() => undefined}
								portfolioId={portfolioId}
								assetSymbol={assetSymbol}
								assetType='crypto'
							/>
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
							<DeletePortfolioTransactionsModal
								onCloseModal={() => undefined}
								portfolioId={portfolioId}
								assetSymbol={assetSymbol}
								assetType={assetType}
							/>
						</Modal.Window>
					</Modal>
				</>
			)}
		</DropdownMenu>
	);
}
