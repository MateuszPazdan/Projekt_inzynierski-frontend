import AuthProvider from '../_utils/AuthProvider';

function layout({ children }: { children: React.ReactNode }) {
	return <AuthProvider>{children}</AuthProvider>;
}

export default layout;
