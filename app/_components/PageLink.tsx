import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa6';

export default function PageLink({
	title,
	href,
}: {
	title: string;
	href: string;
}) {
	return (
		<Link
			href={href}
			className='text-2xl flex flex-row w-fit items-center gap-1 hover:text-second transition-colors duration-300'
		>
			<span className='font-medium'>{title}</span>
			<FaAngleRight className='text-xl' />
		</Link>
	);
}
