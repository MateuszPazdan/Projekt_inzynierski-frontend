export default function InfoCard({
	title,
	children,
	isLoading,
	text,
	additionalInfo,
}: {
	title: string;
	children?: React.ReactNode;
	isLoading?: boolean;
	text?: string;
	additionalInfo?: React.ReactNode;
}) {
	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
			<div className='flex flex-row gap-1 justify-between items-center text-sm sm:text-base'>
				<p className='text-gray-600 font-medium'>{title}</p>
				<div>{additionalInfo}</div>
			</div>
			{!isLoading ? (
				<>
					{text && <p className='font-medium text-base sm:text-xl '>{text}</p>}
					{children && (
						<div className='text-base sm:text-xl font-medium'>{children}</div>
					)}
				</>
			) : (
				<div className='h-[30px] w-2/3 sm:w-1/3 rounded shimmer' />
			)}
		</div>
	);
}
