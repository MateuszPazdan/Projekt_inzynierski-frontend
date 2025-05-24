import BudgetElement from './BudgetElement';

export default function BudgetList() {
	return (
		<div className='space-y-5'>
			<BudgetElement
				title='Na życie'
				description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem modi inventore, exercitationem nam vero, neque dolor sequi consequatur veritatis ipsam, placeat minus facilis nobis totam maiores praesentium quibusdam tenetur quasi unde necessitatibus magni veniam corrupti. Debitis adipisci accusamus nulla illo!'
				color='#22C55E'
				balance={49000}
			/>
			<BudgetElement
				title='Coś odłożę'
				description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem modi inventore, exercitationem nam vero, neque dolor sequi consequatur veritatis ipsam, placeat minus facilis nobis totam maiores praesentium quibusdam tenetur quasi unde necessitatibus magni veniam corrupti. Debitis adipisci accusamus nulla illo!'
				color='#b5c522'
				balance={2500}
			/>
			<BudgetElement
				title='Nie ruszać!'
				description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem modi inventore, exercitationem nam vero, neque dolor sequi consequatur veritatis ipsam, placeat minus facilis nobis totam maiores praesentium quibusdam tenetur quasi unde necessitatibus magni veniam corrupti. Debitis adipisci accusamus nulla illo!'
				color='#2d22c5'
				balance={2500}
			/>
		</div>
	);
}
