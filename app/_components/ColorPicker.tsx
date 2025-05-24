'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ColorPickerProps {
	name: string;
	register: UseFormRegister<FieldValues>;
	colors: string[];
	selectedColor?: string;
}

export default function ColorPicker({
	name,
	register,
	colors,
	selectedColor,
}: ColorPickerProps) {
	return (
		<fieldset className='flex flex-col gap-2'>
			<legend className='pl-1 text-blackOne'>Kolor</legend>
			<div className='flex flex-row gap-4'>
				{colors.map((color, index) => (
					<label key={index} className='relative'>
						<input
							type='radio'
							value={color}
							{...register(name, { required: 'Wybierz kolor' })}
							className='sr-only peer'
							defaultChecked={selectedColor === color}
						/>
						<div
							className={`w-10 h-10 aspect-square rounded-lg border border-grayOne cursor-pointer transition duration-300 
								bg-[${color}]
								peer-checked:ring-2 peer-checked:ring-main`}
							style={{ backgroundColor: color }}
						></div>
					</label>
				))}
			</div>
		</fieldset>
	);
}
