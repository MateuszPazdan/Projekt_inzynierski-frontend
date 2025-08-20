import Image from 'next/image';

interface UserImageProps {
	imageUrl?: string;
	imageAlt?: string;
}

export default function UserImage({ imageUrl, imageAlt }: UserImageProps) {
	return (
		<div>
			<Image
				className='object-cover aspect-square'
				src={imageUrl ?? '/user.png'}
				alt={imageAlt ?? ''}
				fill
			/>
		</div>
	);
}
