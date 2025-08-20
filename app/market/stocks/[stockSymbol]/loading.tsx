import Spinner from '@/app/_components/Spinner';

export default function Loading() {
	return (
		<div className='min-h-full w-full flex items-center justify-center'>
			<Spinner
				size='large'
				color='text-main'
				description='Ładowanie szczegółów akcji...'
			/>
		</div>
	);
}
