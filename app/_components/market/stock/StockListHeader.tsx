import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

interface StockListHeaderProps {
	sort: { by: string; order: string };
	handleSort: (sortItem: string) => void;
	thStyles: string;
}

export default function StockListHeader({
	sort,
	handleSort,
	thStyles,
}: StockListHeaderProps) {
	return (
		<thead>
			<tr>
				<th className={`w-0`}></th>
				<th
					className={`px-2 py-2 text-center group cursor-pointer`}
					onClick={() => handleSort('rank')}
				>
					<span className='flex flex-row items-center '>
						{sort.by === 'rank' ? (
							sort.order === 'asc' ? (
								<FaAngleUp />
							) : (
								<FaAngleDown />
							)
						) : (
							<FaAngleDown className='group-hover:opacity-100 opacity-0 transition-opacity duration-300' />
						)}
						#
					</span>
				</th>
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
						1h
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
						24h
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
						7d
					</span>
				</th>
				<th
					className={`${thStyles} pr-2 md:pr-5 cursor-pointer`}
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
						Wolumen 24h
					</span>
				</th>
				<th
					className={`${thStyles} pr-2 md:pr-5 cursor-pointer`}
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
						Kapitalizacja
					</span>
				</th>
			</tr>
		</thead>
	);
}
