'use client';

import Button from './_components/Button';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className='flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center'>
			<h2 className='text-lg font-semibold text-red-500'>Coś poszło nie tak</h2>
			<p className='text-gray-600 pb-2'>{error.message}</p>
			<Button onClick={() => reset()}>Spróbuj ponownie</Button>
		</div>
	);
}
