import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Option {
	label: string;
	value: string | boolean;
}

interface FormCheckboxProps {
	register: UseFormRegister<FieldValues>;
	name: string;
	options: Option[];
	label?: string;
	error?: string;
	required?: boolean;
}

export default function FormCheckbox({
	register,
	name,
	options,
	label,
	error,
	required,
	...rest
}: FormCheckboxProps) {
	return (
		<fieldset className='flex flex-col gap-2'>
			{label && <legend className='pl-1 text-blackOne'>{label}</legend>}

			<div className='flex flex-col gap-2 pl-1'>
				{options.map((option, index) => (
					<div key={index} className='w-full flex items-center gap-2 '>
						<input
							className='peer relative appearance-none shrink-0 w-5 h-5 mt-1 border-blackOne/70 border-[2px] rounded-[4px] bg-white checked:bg-second checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-third cursor-pointer'
							type='checkbox'
							{...rest}
							id={String(index)}
							value={String(option.value)}
							{...register(name, {
								required: required && 'To pole jest wymagane',
							})}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									e.currentTarget.checked = !e.currentTarget.checked;
								}
							}}
						/>
						<svg
							className='absolute w-5 h-5 mt-1 hidden peer-checked:block pointer-events-none'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='#fff'
							stroke-width='4'
							stroke-linecap='round'
							stroke-linejoin='round'
						>
							<polyline points='20 6 9 17 4 12'></polyline>
						</svg>
						<label
							htmlFor={String(index)}
							className='mt-[5px] text-black/90 text-base cursor-pointer'
						>
							{option.label}
						</label>
					</div>
				))}
			</div>

			{error && <p className='text-sm text-redAccent pl-1 -mb-4'>{error}</p>}
		</fieldset>
	);
}
