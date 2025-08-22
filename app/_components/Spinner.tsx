import { ImSpinner2 } from 'react-icons/im';

const spinnerSize = {
	small: 'text-2xl',
	medium: 'text-3xl',
	large: 'text-4xl',
};

interface SpinnerProps {
	size: 'small' | 'medium' | 'large';
	color?: string;
	description?: string;
}

function Spinner({ size, color, description }: SpinnerProps) {
	return (
		<span className='flex flex-1 flex-col justify-center items-center gap-2 w-full '>
			<ImSpinner2 className={`animate-spin ${spinnerSize[size]} ${color}`} />
			<p className={`	text-sm ${!description && ' hidden '}`}>{description}</p>
		</span>
	);
}

export default Spinner;
