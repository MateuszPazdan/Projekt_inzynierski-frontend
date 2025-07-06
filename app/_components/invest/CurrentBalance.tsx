import { formatFullAmount } from '@/app/_utils/formatAmountOfMoney';

export default function CurrentBalance({ balance }: { balance: number }) {
	return (
		<div className='rounded-lg border border-grayThird shadow-md bg-white p-3 px-5'>
			<p className='text-lg xl:text-xl font-medium mb-2'>Szacowana wartość</p>
			<p>{formatFullAmount(balance)}</p>
		</div>
	);
}
