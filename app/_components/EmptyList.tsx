export default function EmptyList({
	title,
	description,
}: {
	title?: string;
	description?: string;
}) {
	return (
		<div className='flex flex-col items-center justify-center gap-2 py-10 lg:py-20 text-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='currentColor'
				className='w-8 md:w-9 bi bi-search pb-3'
				viewBox='0 0 16 16'
			>
				<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
			</svg>
			<p className='text-lg md:text-2xl font-medium'>{title}</p>
			<p className='text-black/70 text-sm md:text-base'>{description}</p>
		</div>
	);
}
