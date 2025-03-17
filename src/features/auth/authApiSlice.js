import { globalClusterApi } from "../api/apiSlice";

export const AuthApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupData) => ({
        url: "/api/v1/accounts/signup/",
        method: "POST",
        body: signupData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/accounts/token/",
        method: "POST",
        body: loginData,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/accounts/individuals/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      transformResponse: (response) => {
        return response.user || response;
      },
    }),
    updateAdminProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/accounts/individuals/update_admin_profile/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      transformResponse: (response) => {
        return response.user || response;
      },
    }),
    passwordResetRequest: builder.mutation({
      query: (email) => ({
        url: "/api/v1/accounts/password/reset/",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetPasswordData, uidb64, token }) => ({
        url: `/api/v1/accounts/password/reset/${uidb64}/${token}/`,
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/accounts/password_update/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useUpdateUserProfileMutation,
  useUpdateAdminProfileMutation,
  usePasswordResetRequestMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = AuthApiSlice;
