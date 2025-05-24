import BudgetHeader from '@/app/_components/budget/BudgetHeader';
import BudgetList from './BudgetList';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto '>
			<BudgetHeader />
			<BudgetList />
		</div>
	);
}
