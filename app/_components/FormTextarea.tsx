import { TextareaHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormTextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	register: UseFormRegister<FieldValues>;
	error?: string;
	name: string;
	label?: string;
	required?: boolean;
	validateFunction?: () => string | boolean;
}

function FormTextarea({
	register,
	error,
	name,
	label,
	required,
	validateFunction,
	...rest
}: FormTextareaProps) {
	return (
		<div className='relative flex flex-col w-full'>
			{label && (
				<label htmlFor={name} className='pl-1 mb-1'>
					{label}
				</label>
			)}
			<textarea
				{...register(name, {
					required: required && 'Pole wymagane',
					validate: validateFunction,
				})}
				name={name}
				className={`resize-none border-grayOne border-2 rounded-lg p-2 focus:outline-none focus:border-main min-h-[120px] ${
					error ? 'border-redAccent focus:border-redAccent/50' : ''
				}`}
				{...rest}
			/>
			<p className='absolute -bottom-6 left-2 text-sm text-redAccent'>
				{error}
			</p>
		</div>
	);
}

export default FormTextarea;
