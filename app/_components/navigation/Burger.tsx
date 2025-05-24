import { motion } from 'framer-motion';

interface Props {
	isOpen: boolean;
	onClick: () => void;
}

const burgerFirstVariants = {
	opened: {
		y: ['0px', '11px', '11px'],
		rotate: ['0deg', '0deg', '45deg'],
	},
	closed: {
		y: ['11px', '11px', '0px'],
		rotate: ['45deg', '0deg', '0deg'],
	},
};

const burgerSecondVariants = {
	opened: { opacity: ['100%', '100%', '0%'] },
	closed: { opacity: ['0%', '0%', '100%'] },
};

const burgerThirdVariants = {
	opened: {
		y: ['0px', '-11px', '-11px'],
		rotate: ['0deg', '0deg', '-45deg'],
	},
	closed: {
		y: ['-11px', '-11px', '0px'],
		rotate: ['-45deg', '0deg', '0deg'],
	},
};

export default function Burger({ isOpen, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className='hover:cursor-pointer p-2 flex flex-col gap-[7px] hover:bg-white/10 rounded-md transition-colors duration-300'
		>
			<motion.div
				variants={burgerFirstVariants}
				animate={isOpen ? 'opened' : 'closed'}
				transition={{ duration: 0.3, type: 'tween' }}
				className='relative w-8 h-1 bg-main rounded-full'
			></motion.div>
			<motion.div
				variants={burgerSecondVariants}
				animate={isOpen ? 'opened' : 'closed'}
				transition={{ duration: 0.3, type: 'tween' }}
				className='relative w-8 h-1 bg-main rounded-full origin-center'
			></motion.div>
			<motion.div
				variants={burgerThirdVariants}
				animate={isOpen ? 'opened' : 'closed'}
				transition={{ duration: 0.3, type: 'tween' }}
				className='relative w-8 h-1 bg-main rounded-full'
			></motion.div>
		</button>
	);
}
