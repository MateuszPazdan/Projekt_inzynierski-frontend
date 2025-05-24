import Link from 'next/link';

export default function UserNavElement({
	icon,
	title,
	href,
	onClick,
}: {
	icon: React.ReactNode;
	title: string;
	href?: string;
	onClick?: () => void;
}) {
	if (href)
		return (
			<Link
				href={href}
				className='grid grid-cols-[auto_1fr] items-center gap-2 p-2 hover:bg-grayOne rounded-lg duration-300 transition-colors'
			>
				<span className='text-2xl'>{icon}</span>
				<p className='text-base'>{title}</p>
			</Link>
		);
	if (onClick)
		return (
			<button
				onClick={onClick}
				className='grid grid-cols-[auto_1fr] items-center gap-2 p-2 hover:bg-grayOne rounded-lg  duration-300 transition-colors'
			>
				<span className='text-2xl'>{icon}</span>
				<p className='text-base text-left'>{title}</p>
			</button>
		);
}
