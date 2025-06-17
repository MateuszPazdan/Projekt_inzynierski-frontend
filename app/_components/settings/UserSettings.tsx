'use client';

import {
	useModifyUserMutation,
	useRetrieveUserQuery,
} from '@/app/_redux/features/authApiSlice';
import Image from 'next/image';
import Modal from '../Modal';
import ManageUserSettingsModal from './ManageUserSettingsModal';
import toast from 'react-hot-toast';
import Spinner from '../Spinner';

export default function UserSettings() {
	const {
		data: user,
		isLoading: isUserLoading,
		isFetching,
	} = useRetrieveUserQuery();
	const [modifyUser, { isLoading: isUserModifying }] = useModifyUserMutation();

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		modifyUser({ avatar_image: file })
			.unwrap()
			.then(() => {
				toast.success('Zdjęcie profilowe zostało zmienione.');
			})
			.catch((err) => {
				toast.error(
					err.data.detail ?? 'Wystąpił błąd podczas zmiany zdjęcia profilowego.'
				);
			});
	};

	if (isUserLoading || isFetching) {
		return (
			<div className='py-10'>
				<Spinner size='small' description='Ładowanie danych użytkownika...' />
			</div>
		);
	}

	return (
		<div className='pt-5 space-y-5'>
			<div className='flex flex-col gap-3'>
				<span className='font-medium text-gray-700'>Zdjęcie profilowe</span>
				<div className='flex flex-row gap-5 items-center'>
					<div className='relative w-[80px] h-[80px]'>
						<Image
							src={user?.avatar_image ?? '/user.png'}
							alt={`Zdjęcie profilowe ${user?.username}`}
							fill
							className='rounded-full object-cover border border-grayThird'
						/>
						{isUserModifying && (
							<div className='absolute inset-0 flex items-center justify-center bg-white/60 rounded-full'>
								<Spinner size='small' />
							</div>
						)}
					</div>

					<label className='cursor-pointer'>
						<input
							type='file'
							accept={'image/*'}
							onChange={handleAvatarChange}
							className='hidden'
							disabled={isUserModifying}
						/>
						<div className='bg-white hover:bg-grayThird border border-grayThird transition-colors duration-300 px-5 py-2 rounded-lg'>
							Zmień zdjęcie
						</div>
					</label>
				</div>
			</div>
			<div className='flex flex-col gap-5 '>
				<div className='flex flex-col gap-3'>
					<span className='font-medium text-gray-700'>Nazwa użytkownika</span>
					<div className='p-2 px-2 border-grayThird border rounded-lg bg-white w-full max-w-[300px] flex flex-row justify-between items-center'>
						<p>{user?.username}</p>
						<Modal>
							<Modal.Open opens='changeUsername'>
								<button>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										viewBox='0 0 16 16'
										className='text-gray-700 hover:text-grayThird transition-colors duration-300 cursor-pointer'
									>
										<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
										<path
											fillRule='evenodd'
											d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
										/>
									</svg>
								</button>
							</Modal.Open>
							<Modal.Window name='changeUsername'>
								<ManageUserSettingsModal
									onCloseModal={() => undefined}
									user={user}
								/>
							</Modal.Window>
						</Modal>
					</div>
				</div>
				<div className='flex flex-col gap-3'>
					<span className='font-medium text-gray-700'>E-mail</span>
					<div className='p-2 px-2 border-grayThird border rounded-lg bg-white w-full max-w-[300px] '>
						<p>{user?.email}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
