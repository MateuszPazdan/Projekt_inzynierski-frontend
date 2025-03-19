import { RefObject, useEffect } from 'react';

export const useClickOutside = (
	ref: RefObject<HTMLElement>,
	handleOnClickOutside: (event: MouseEvent | TouchEvent) => void,
	refsecond?: RefObject<HTMLElement>
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (
				!ref.current ||
				ref.current.contains(event.target as Node) ||
				refsecond?.current?.contains(event.target as Node)
			) {
				return;
			}
			handleOnClickOutside(event);
		};
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handleOnClickOutside, refsecond]);
};
