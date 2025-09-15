export default function SectionHeader({
	title,
	description,
	size,
}: {
	title: string;
	description?: string;
	size?: 'normal' | 'small';
}) {
	return (
		<div>
			<p
				className={`text-blackOne ${
					size === 'small' ? 'text-xl lg:text-3xl' : 'text-3xl lg:text-4xl'
				}`}
			>
				{title}
			</p>
			<p className='font-light text-sm sm500:text-base md:text-lg pt-2'>
				{description}
			</p>
		</div>
	);
}
