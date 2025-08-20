import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormSelectProps {
	label: string;
	name: string;
	options: string[];
	register: UseFormRegister<FieldValues>;
	error?: string;
	required?: boolean;
	defaultValue?: string;
}

export default function FormSelect({
	label,
	name,
	options,
	register,
	error,
	required = false,
	defaultValue,
}: FormSelectProps) {
	return (
		<div className='relative flex flex-col'>
			<label htmlFor={name} className='pl-1'>
				{label}
			</label>
			<select
				defaultValue={''}
				{...register(name, {
					required: required && 'Wybór kategorii jest wymagany',
				})}
				className={`border-grayThird border rounded-lg p-2 focus:outline-none focus:border-main ${
					error && 'border-redAccent focus:border-redAccent/50 p-1'
				}`}
			>
				<option value='' disabled>
					{defaultValue || 'Wybierz'}
				</option>
				{options.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
			<p className='absolute -bottom-6 left-2 text-sm text-redAccent'>
				{error}
			</p>
		</div>
	);
}
