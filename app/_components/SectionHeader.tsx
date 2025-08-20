export default function SectionHeader({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<>
			<p className='text-blackOne text-3xl md:text-3xl lg:text-4xl'>{title}</p>
			<p className='font-light text-sm sm500:text-base md:text-lg pt-2'>
				{description}
			</p>
		</>
	);
}
