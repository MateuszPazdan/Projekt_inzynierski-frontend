export default function InfoCard({
	title,
	children,
	isLoading,
	text,
}: {
	title: string;
	children?: React.ReactNode;
	isLoading?: boolean;
	text?: string;
}) {
	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-4 space-y-1'>
			<p className='text-gray-600 font-medium'>{title}</p>
			{!isLoading ? (
				<>
					{text && <p className='font-medium text-xl'>{text}</p>}
					{children && <div>{children}</div>}
				</>
			) : (
				<div className='h-[30px] w-2/3 sm:w-1/3 rounded shimmer' />
			)}
		</div>
	);
}
