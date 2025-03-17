import { globalClusterApi } from "../api/apiSlice";

/**
 * BusinessApiSlice is a set of endpoints for authentication-related API calls.
 * @param {globalClusterApi} globalClusterApi - The API object to inject the endpoints into.
 * @returns None
 */
export const BusinessApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    signupBusiness: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/accounts/signup/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
        formData: true,
      }),
    }),
    getBusiness: builder.mutation({
      query: () => ({
        url: "/api/v1/accounts/companies/",
        method: "GET",
      }),
    }),
    getBusinessData: builder.query({
      query: (businessId) => ({
        url: `/api/v1/accounts/companies/get_company/?businessId=${businessId}`,
        method: "GET",
      }),
    }),
    loginBusiness: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/accounts/token/",
        method: "POST",
        body: loginData,
      }),
    }),
    updateBusinessProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/accounts/companies/${id}/`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),

    updateBusinessPassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/accounts/password_update/`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordBusiness: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `/register/company/reset/${token}`,
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    forgotPasswordBusiness: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/register/company/forgot",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
    getPendingCompanies: builder.mutation({
      query: () => ({
        url: "/api/v1/accounts/companies/get_registration_requests/",
        method: "GET",
      }),
    }),
    getNonPendingCompanies: builder.mutation({
      query: () => ({
        url: "/api/v1/accounts/companies/get_registration_history/",
        method: "GET",
      }),
    }),
    deleteCompany: builder.mutation({
      query: (userId) => ({
        url: "/api/v1/accounts/companies/delete/",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    acceptCompanyRegistration: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/companies/update_reg_status/`,
        method: "PATCH",
        body: JSON.stringify({
          userId,
          status: "approved",
        }),
      }),
    }),
    rejectCompanyRegistration: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/companies/update_reg_status/`,
        method: "PATCH",
        body: JSON.stringify({
          userId,
          status: "rejected",
        }),
      }),
    }),
  }),
});

export const {
  useSignupBusinessMutation,
  useGetBusinessMutation,
  useGetBusinessDataQuery,
  useLoginBusinessMutation,
  useUpdateBusinessProfileMutation,
  useResetPasswordBusinessMutation,
  useUpdateBusinessPasswordMutation,
  useForgotPasswordBusinessMutation,
  useGetPendingCompaniesMutation,
  useGetNonPendingCompaniesMutation,
  useDeleteCompanyMutation,
  useAcceptCompanyRegistrationMutation,
  useRejectCompanyRegistrationMutation,
} = BusinessApiSlice;
