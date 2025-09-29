export default function EmptyList({
	title,
	description,
	size = 'xs',
}: {
	title?: string;
	description?: string;
	size?: 'xs' | 'normal';
}) {
	return (
		<div
			className={`flex flex-col items-center justify-center  ${
				size === 'xs' ? 'py-8 gap-1' : 'py-10 lg:py-20 gap-2'
			} text-center`}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='currentColor'
				className={`${size === 'xs' ? 'w-6' : 'w-8 md:w-9 pb-3'} bi bi-search `}
				viewBox='0 0 16 16'
			>
				<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
			</svg>
			<p
				className={`${
					size === 'xs' ? 'text-lg' : 'text-lg md:text-2xl'
				} font-medium`}
			>
				{title}
			</p>
			<p
				className={`${
					size === 'xs' ? 'text-sm' : ' text-sm md:text-base'
				} text-black/70`}
			>
				{description}
			</p>
		</div>
	);
}
