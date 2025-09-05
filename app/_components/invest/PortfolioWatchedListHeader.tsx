import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

interface PortfolioWachedListHeaderProps {
	sort: { by: string; order: string };
	handleSort: (sortItem: string) => void;
	thStyles: string;
}

export default function PortfolioWachedListHeader({
	sort,
	handleSort,
	thStyles,
}: PortfolioWachedListHeaderProps) {
	return (
		<thead>
			<tr>
				<th
					className={`${thStyles} text-left cursor-pointer`}
					onClick={() => handleSort('currency')}
				>
					<span className='flex flex-row items-center'>
						Waluta
						{sort.by === 'currency' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
					</span>
				</th>
				<th
					className={`${thStyles} cursor-pointer`}
					onClick={() => handleSort('price')}
				>
					<span className='flex flex-row justify-end items-center '>
						{sort.by === 'price' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
						Kurs
					</span>
				</th>
				<th
					className={`${thStyles} cursor-pointer`}
					onClick={() => handleSort('change1h')}
				>
					<span className='flex flex-row justify-end items-center '>
						{sort.by === 'change1h' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
						Zysk / Strata (24h)
					</span>
				</th>
				<th
					className={`${thStyles} cursor-pointer`}
					onClick={() => handleSort('change24h')}
				>
					<span className='flex flex-row justify-end items-center '>
						{sort.by === 'change24h' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
						Całkowity koszt
					</span>
				</th>
				<th
					className={`${thStyles} cursor-pointer`}
					onClick={() => handleSort('change7d')}
				>
					<span className='flex flex-row justify-end items-center '>
						{sort.by === 'change7d' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
						Średni koszt
					</span>
				</th>
				<th
					className={`${thStyles} cursor-pointer`}
					onClick={() => handleSort('volume_24h')}
				>
					<span className='flex flex-row justify-end items-center '>
						{sort.by === 'volume_24h' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
						Całkowity zysk / strata
					</span>
				</th>
				<th
					className={`${thStyles} cursor-pointer`}
					onClick={() => handleSort('market_cap')}
				>
					<span className='flex flex-row justify-end items-center '>
						{sort.by === 'market_cap' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
						Zasoby
					</span>
				</th>
			</tr>
		</thead>
	);
}
