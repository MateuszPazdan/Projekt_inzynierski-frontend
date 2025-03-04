import { apiSlice } from '../services/apiSlice';

export interface User {
	id: number;
	email: string;
	username: string;
	created_at: string;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => ({ url: '/users/me', method: 'GET' }),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/auth/token',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					email: email,
					password: password,
				},
			}),
		}),
		register: builder.mutation({
			query: ({ email, username, password }) => ({
				url: '/users/register',
				method: 'POST',
				body: { email, username, password },
			}),
		}),
		logout: builder.mutation({
			query: () => ({ url: '/auth/logout', method: 'GET' }),
		}),
		verifyToken: builder.mutation({
			query: () => ({
				url: '/auth/refresh-token',
				method: 'POST',
			}),
		}),
		verifyEmail: builder.mutation<null, { token: string }>({
			query: ({ token }) => {
				return {
					url: `/users/confirm/${token}`,
					method: 'POST',
				};
			},
		}),
		resetPassword: builder.mutation({
			query: ({ email }) => ({
				url: '/users/reset-password/',
				method: 'POST',
				body: { email },
			}),
		}),
		confirmPassword: builder.mutation({
			query: ({ token, password }) => ({
				url: `/users/reset-password/${token}`,
				method: 'POST',
				body: { new_password: password },
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useVerifyTokenMutation,
	useResetPasswordMutation,
	useVerifyEmailMutation,
	useConfirmPasswordMutation,
} = authApiSlice;
