'use client';

import { useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FaAngleDown } from 'react-icons/fa6';

interface FormSelectProps {
	label: string;
	name: string;
	options?: string[] | [];
	register: UseFormRegister<FieldValues>;
	required?: boolean;
	defaultValue?: string;
	error?: string;
	setValue: UseFormSetValue<FieldValues>;
	disabled?: boolean;
}

export default function FormSelect({
	label,
	name,
	options,
	register,
	required = false,
	defaultValue,
	error,
	setValue,
	disabled,
}: FormSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<string | null>(null);

	return (
		<div className='relative flex flex-col'>
			<label htmlFor={name} className='pl-1 mb-1'>
				{label}
			</label>

			<input
				type='hidden'
				value={(selected || defaultValue) ?? ''}
				{...register(name, {
					required: required && 'Wybór kategorii jest wymagany',
				})}
			/>

			<button
				type='button'
				onClick={() => setIsOpen((prev) => !prev)}
				className={`w-full flex justify-between items-center border border-grayThird rounded-lg p-2 text-left bg-white hover:bg-grayOne transition-colors duration-300 disabled:opacity-60 disabled:bg-grayOne disabled:cursor-default ${
					error && 'border-redAccent focus:border-redAccent/50'
				}`}
				disabled={disabled || !options}
			>
				<span>{selected || defaultValue || 'Wybierz'}</span>
				<FaAngleDown
					className={`transition-transform duration-300 ${
						isOpen && 'rotate-180'
					}`}
				/>
			</button>

			{isOpen && options && (
				<ul className='absolute max-h-[240px] overflow-y-auto top-full left-0 w-full bg-white border border-grayThird rounded-lg mt-1 shadow-md z-10'>
					{options &&
						options.map((item) => (
							<li
								key={item}
								onClick={() => {
									setSelected(item);
									setValue(name, item, { shouldValidate: true });
									setIsOpen(false);
								}}
								className='p-2 hover:bg-grayOne cursor-pointer transition-colors duration-300 text-sm'
							>
								{item}
							</li>
						))}
				</ul>
			)}
			<p className='absolute -bottom-6 left-2 text-sm text-redAccent'>
				{error}
			</p>
		</div>
	);
}
