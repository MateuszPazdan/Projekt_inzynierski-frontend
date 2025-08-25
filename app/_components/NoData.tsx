import { MdErrorOutline } from 'react-icons/md';

export default function NoData({ message }: { message?: string }) {
	return (
		<span className='flex flex-row gap-1 items-center text-base font-medium'>
			<MdErrorOutline className='text-xl'/>
			{message ?? 'Brak danych'}
		</span>
	);
}
