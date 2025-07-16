export default function ShadowContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
			{children}
		</div>
	);
}
