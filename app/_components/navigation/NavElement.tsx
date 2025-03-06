import Link from 'next/link';

interface NavElementProps {
	href: string;
	icon: React.ReactNode;
	title: string;
	isExtended?: boolean;
}

export default function NavElement({
	href,
	icon,
	title,
	isExtended = false,
}: NavElementProps) {
	return (
		<Link
			href={href}
			className='grid grid-cols-[auto_1fr] items-center gap-2 p-2 min-w-16 hover:bg-grayOne rounded-lg duration-300 transition-colors'
		>
			<span className='block pl-[5.5px] text-xl text-gray-700'>{icon}</span>
			<p
				className={`text-base transition-opacity duration-300 ${
					isExtended ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{title}
			</p>
		</Link>
	);
}
