export default function DropdownMenuElement({
	icon,
	text,
	onClick,
}: {
	icon: React.ReactNode;
	text: string;
	onClick: () => void;
}) {
	return (
		<button
			className='p-2 w-full flex flex-row gap-2 items-center text-base text-gray-600 hover:bg-grayOne transition-colors duration-300 rounded-md'
			onClick={onClick}
		>
			{icon}
			<span>{text}</span>
		</button>
	);
}
