import ChangePassword from '../_components/settings/ChangePassword';
import DeleteAccount from '../_components/settings/DeleteAccount';
import UserSettings from '../_components/settings/UserSettings';

export default function page() {
	return (
		<div className='px-2 sm:px-5 lg:px-12 py-10 max-w-[1800px] mx-auto md:space-y-5'>
			<div className='pb-5 mb-5 '>
				<p className='text-3xl font-medium'>Konto</p>
				<span className='text-gray-700'>Zarządzaj swoim profilem.</span>
			</div>
			<div className='md:p-5 md:rounded-lg md:bg-white md:shadow-md md:border border-grayThird border-b pb-8'>
				<p className='text-xl font-medium'>Informacje osobiste</p>
				<span className='text-gray-700'>
					Podaj swoje dane, aby Twoje konto mogło działać prawidłowo.
				</span>
				<UserSettings />
			</div>
			<div className='md:p-5 md:rounded-lg md:bg-white md:shadow-md md:border border-grayThird border-b pt-6 pb-8'>
				<p className='text-xl font-medium'>Hasło</p>
				<span className='text-gray-700'>Ustaw unikalne hasło.</span>
				<ChangePassword />
			</div>
			<div className='md:p-5 md:rounded-lg md:bg-white md:shadow-md md:border border-grayThird pt-6'>
				<p className='text-xl font-medium'>Usuwanie konta</p>
				<span className='text-gray-700'>
					Trwale usuń swoje konto i wszystkie powiązane dane. Tego nie da się
					cofnąć.
				</span>
				<DeleteAccount />
			</div>
		</div>
	);
}
