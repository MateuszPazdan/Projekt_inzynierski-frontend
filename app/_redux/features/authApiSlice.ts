import { apiSlice } from '../services/apiSlice';

export interface User {
	id: number;
	email: string;
	username: string;
	created_at: string;
	avatar_image: string;
}

export interface UpdateUserInput {
	username?: string;
	avatar_image?: File;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => ({ url: '/users/me', method: 'GET' }),
			providesTags: ['User'],
		}),
		modifyUser: builder.mutation<User, UpdateUserInput>({
			query: (userData) => {
				const formData = new FormData();

				if (userData.username) {
					formData.append(
						'user',
						JSON.stringify({ username: userData.username })
					);
				}

				if (userData.avatar_image) {
					formData.append('avatar_image', userData.avatar_image);
				}

				return {
					url: '/users/me',
					method: 'PATCH',
					body: formData,
				};
			},
			invalidatesTags: ['User'],
		}),
		deleteUser: builder.mutation<void, { password: string }>({
			query: (password) => ({
				url: 'users/me',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password: password.password,
				}),
			}),
		}),
		changePassword: builder.mutation<
			void,
			{ password: string; new_password: string }
		>({
			query: ({ password, new_password }) => ({
				url: '/users/me/reset-password',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password,
					new_password,
				}),
			}),
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
			query: () => ({ url: '/auth/logout', method: 'DELETE' }),
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
	useModifyUserMutation,
	useDeleteUserMutation,
	useChangePasswordMutation,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useVerifyTokenMutation,
	useResetPasswordMutation,
	useVerifyEmailMutation,
	useConfirmPasswordMutation,
} = authApiSlice;
