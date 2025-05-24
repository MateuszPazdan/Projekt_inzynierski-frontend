import BudgetElement from '../../_components/budget/BudgetElement';

export default function BudgetList() {
	return (
		<div className='grid grid-cols-1 gap-2 sm:gap-5 lg:gap-6 items-stretch'>
			<BudgetElement
				title='Na życie'
				description='Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
				color='#22C55E'
				balance={49000}
			/>
			<BudgetElement title='Coś odłożę' color='#b5c522' balance={2500} />
			<BudgetElement
				title='Nie ruszać!'
				description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem modi inventore, exercitationem nam vero, neque dolor sequi consequatur veritatis ipsam.'
				color='#2d22c5'
				balance={2500}
			/>
		</div>
	);
}
