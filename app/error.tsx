'use client';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='flex flex-col items-center justify-center p-6 text-center'>
			<h2 className='text-lg font-semibold text-red-600'>Coś poszło nie tak</h2>
			<p className='text-gray-600'>{error.message}</p>
			<button
				onClick={() => reset()}
				className='mt-4 rounded-md bg-main px-4 py-2 text-white hover:bg-main/80 transition'
			>
				Spróbuj ponownie
			</button>
		</div>
	);
}
