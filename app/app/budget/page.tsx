import BudgetList from '@/app/_components/budget/BudgetList';
import BudgetsHeader from '@/app/_components/budget/BudgetsHeader';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto min-h-full w-full flex flex-col '>
			<BudgetsHeader />
			<BudgetList />
		</div>
	);
}
