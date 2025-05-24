interface BudgetElementProps {
	title: string;
	description: string;
	color: string;
	balance: number;
}

export default function BudgetElement({
	color,
	description,
	title,
	balance,
}: BudgetElementProps) {
	return (
		<div className='relative overflow-hidden flex flex-col md:flex-row justify-between gap-2 items-center px-2 sm:px-5 lg:px-12 py-4 sm:py-6 lg:py-10 border-2 border-white hover:border-second hover:text-second shadow-myShadow rounded-lg transition-colors duration-300 cursor-pointer'>
			<div className='flex flex-row gap-5 items-center'>
				<p
					className={`flex items-center justify-center w-12 h-12 text-xl aspect-square text-white rounded-full`}
					style={{ backgroundColor: color }}
				>
					{title.charAt(0)}
				</p>
				<div>
					<p className='text-2xl'>{title}</p>
					<p className='text-blackOne/70 line-clamp-2 sm600:line-clamp-1'>
						{description}
					</p>
					<p className='text-xl text-nowrap md:hidden'>{balance} PLN</p>
				</div>
			</div>
			<p className='hidden md:inline text-2xl text-nowrap'>{balance} PLN</p>
		</div>
	);
}
