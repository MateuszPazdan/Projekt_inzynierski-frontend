function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen flex justify-center lg:items-center py-12 lg:bg-grayOne'>
			{children}
		</div>
	);
}

export default layout;
