import Image from 'next/image';

interface UserImageProps {
	imageUrl?: string;
	imageAlt?: string;
}

export default function UserImage({ imageUrl, imageAlt }: UserImageProps) {
	return (
		<div>
			<div>
				<Image
					className='object-cover'
					src={imageUrl ?? '/user.png'}
					alt={imageAlt ?? ''}
					fill
				/>
			</div>
		</div>
	);
}
