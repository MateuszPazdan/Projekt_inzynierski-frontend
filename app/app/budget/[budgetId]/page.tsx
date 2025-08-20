import BudgetInfo from '@/app/_components/budget/BudgetInfo';

export default async function page({
	params,
}: {
	params: Promise<{ budgetId: string }>;
}) {
	const { budgetId } = await params;
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto '>
			<BudgetInfo budgetId={budgetId} />
		</div>
	);
}
