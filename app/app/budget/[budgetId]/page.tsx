import BudgetInfo from '@/app/_components/budget/BudgetInfo';

export default async function page({
	params,
}: {
	params: Promise<{ budgetId: string }>;
}) {
	const { budgetId } = await params;
	return (
		<div className='flex-1 min-h-full px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] w-full mx-auto flex flex-col gap-10'>
			<BudgetInfo budgetId={budgetId} />
		</div>
	);
}
