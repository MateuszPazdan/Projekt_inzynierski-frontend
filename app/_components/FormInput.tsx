import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegister<FieldValues>;
	error?: string;
	name: string;
	label?: string;
	required?: boolean;
	validateFunction?: () => string | boolean;
}

function FormInput({
	register,
	error,
	name,
	label,
	required,
	validateFunction,
	...rest
}: FormInputProps) {
	return (
		<div className='relative flex flex-col'>
			<label htmlFor={name} className='pl-1'>
				{label}
			</label>
			<input
				{...register(name, {
					required: required && 'Pole wymagane',
					validate: validateFunction,
				})}
				name={name}
				className={`border-grayThird border rounded-lg p-2 focus:outline-none focus focus:border-main ${
					error && 'border-redAccent focus:border-redAccent/50'
				}`}
				{...rest}
			/>
			<p className='absolute -bottom-6 left-2 text-sm text-redAccent'>
				{error}
			</p>
		</div>
	);
}

export default FormInput;
