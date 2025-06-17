import GuestOnlyProvider from '../_utils/GuestOnlyProvider';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-full flex justify-center lg:items-center py-12 lg:bg-grayOne'>
			<GuestOnlyProvider>{children}</GuestOnlyProvider>
		</div>
	);
}

export default layout;
