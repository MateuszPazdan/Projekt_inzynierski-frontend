import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';

interface SortableThProps {
	sortKey?: string;
	sort?: { by: string; order: string };
	handleSort?: (sortItem: string) => void;
	thStyles: string;
	textAlignment?: 'left' | 'right' | 'center';
	additionalStyles?: string;
	children: React.ReactNode;
}

export default function SortableTh({
	sortKey,
	sort,
	handleSort,
	thStyles,
	textAlignment = 'left',
	additionalStyles,
	children,
}: SortableThProps) {
	const alignmentClass = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center',
	}[textAlignment];

	const alignmentClassReversed = {
		left: 'justify-end',
		right: 'justify-start',
		center: 'justify-center',
	}[textAlignment];

	const flexDirection =
		textAlignment === 'right' ? 'flex-row-reverse' : 'flex-row';

	if (sort && sortKey && handleSort)
		return (
			<th
				className={`${thStyles} ${additionalStyles} cursor-pointer `}
				onClick={() => handleSort(sortKey)}
			>
				<span
					className={`flex gap-[2px] ${
						textAlignment === 'right' ? alignmentClassReversed : alignmentClass
					} ${flexDirection} items-center`}
				>
					{children}
					{sort.by === sortKey ? (
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
		);
	else {
		return (
			<th className={`${thStyles} ${additionalStyles} `}>
				<span
					className={`flex gap-[2px] ${
						textAlignment === 'right' ? alignmentClassReversed : alignmentClass
					} ${flexDirection} items-center`}
				>
					{children}
				</span>
			</th>
		);
	}
}
