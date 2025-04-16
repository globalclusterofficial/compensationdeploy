import { globalClusterApi } from "../api/apiSlice";

export const UserApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/individuals/${userId}/`,
        method: "GET",
      }),
    }),
    fetchUser: builder.query({
      query: () => ({
        url: `/api/v1/accounts/individuals/user_data`,
        method: "GET",
      }),
    }),
    fetchUserPaymentProof: builder.query({
      query: (userId) => ({
        url: `/api/v1/accounts/payment_proof/${userId}`,
        method: "GET",
        // params: {
        //   profile_id: userId
        // },
        responseType: "blob",
      }),
    }),
    // signup: builder.mutation({
    //   query: (signupData) => ({
    //     url: "/api/v1/accounts/signup/",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     },
    //     body: signupData,
    //   }),
    // }),
    fetchUserPaymentProofUpload: builder.mutation({
      query: (data) => ({
        url: `/api/v1/accounts/payment_proof/upload/`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: "/api/v1/accounts/individuals/?all=true",
        method: "GET",
      }),
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: "/api/v1/accounts/individuals/",
        method: "GET",
      }),
    }),
    getAllDownline: builder.query({
      query: () => ({
        url: "/api/v1/accounts/individuals/?all_downline=true",
        method: "GET",
      }),
    }),
    getIndividuals: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/individuals/",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/individuals/${userId}/`,
        method: "DELETE",
      }),
    }),
    acceptRegistration: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/individuals/update_reg_status/`,
        method: "PATCH",
        body: JSON.stringify({
          userId,
          status: "approved",
        }),
      }),
    }),
    rejectRegistration: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/individuals/update_reg_status/`,
        method: "PATCH",
        body: JSON.stringify({
          userId,
          status: "rejected",
        }),
      }),
    }),
    suspendUser: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/individuals/activate_or_suspend_user/`,
        method: "PATCH",
        body: JSON.stringify({
          userId,
          is_active: "False",
        }),
      }),
    }),
    activateUser: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/individuals/activate_or_suspend_user/`,
        method: "PATCH",
        body: JSON.stringify({
          userId,
          is_active: "True",
        }),
      }),
    }),
    getPayouts: builder.query({
      query: () => ({
        url: `/api/v1/payments/payout/`,
        method: "GET",
      }),
    }),
    getApprovedPayouts: builder.query({
      query: () => ({
        url: `/api/v1/payments/approved_payout/`,
        method: "GET",
      }),
    }),
    addPayout: builder.mutation({
      query: (payoutData) => ({
        url: `/api/v1/payments/payout/`,
        method: "POST",
        body: payoutData,
      }),
    }),
    updatePayoutStatus: builder.mutation({
      query: (payoutData) => ({
        url: `/api/v1/payments/update_payout_status/`,
        method: "POST",
        body: payoutData,
      }),
    }),
    wallet: builder.mutation({
      query: () => ({
        url: "/api/v1/payments/wallet_info/",
        method: "GET",
      }),
    }),
    members: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/individuals/",
        method: "POST",
      }),
    }),
    ranking: builder.mutation({
      query: (user_id) => ({
        url: `/api/v1/referrals/userrankings/${user_id}/`,
        method: "POST",
      }),
    }),
    getUserRanking: builder.mutation({
      query: () => ({
        url: `/api/v1/referrals/userrankings/`,
        method: "GET",
      }),
    }),
    getBanks: builder.mutation({
      query: () => ({
        url: "/api/v1/payments/banks/",
        method: "GET",
      }),
    }),
    fetchBanks: builder.query({
      query: () => ({
        url: "/api/v1/payments/banks/",
        method: "GET",
      }),
    }),
    verifyAccount: builder.mutation({
      query: (data) => ({
        url: "/api/v1/payments/validate-account/",
        method: "POST",
        body: data,
      }),
    }),
    getUserEarnings: builder.query({
      query: ({ user_id, date }) => ({
        url: `/api/v1/accounts/user-earnings/${user_id}/?date=${date}`,
        method: "GET",
      }),
    }),
    getEarningsTypes: builder.query({
      query: () => ({
        url: "api/v1/accounts/earning-types/",
        method: "GET",
      }),
    }),
    getPendingUsers: builder.mutation({
      query: () => ({
        url: "/api/v1/accounts/individuals/get_registration_requests/",
        method: "GET",
      }),
    }),
    getNonPendingUsers: builder.mutation({
      query: () => ({
        url: "/api/v1/accounts/individuals/get_registration_history/",
        method: "GET",
      }),
    }),
    getUserDataAdmin: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/referrals/individuals/user_admin_data/`,
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      }),
    }),
    getUserProfileVerify: builder.mutation({
      query: (userId, verify) => ({
        url: `/api/v1/referrals/individuals/user_profile_verify/`,
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      }),
    }),
    getUserProfileUnVerify: builder.mutation({
      query: (userId, verify) => ({
        url: `/api/v1/referrals/individuals/user_profile_unverify/`,
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      }),
    }),
    getUserNetworkData: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/accounts/individuals/user_network_data/`,
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      }),
    }),
    getAllEarnings: builder.query({
      query: () => ({
        url: `/api/v1/accounts/earnings/get_all_earnings/`,
        method: "GET",
      }),
    }),
    getAdminDashboard: builder.query({
      query: () => ({
        url: `/api/v1/accounts/individuals/get_admin_dashboard_data/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useGetAllUsersMutation,
  useGetUsersMutation,
  useGetAllDownlineQuery,
  useFetchUserQuery,
  useFetchUserPaymentProofQuery,
  useGetIndividualsMutation,
  useDeleteUserMutation,
  useAcceptRegistrationMutation,
  useRejectRegistrationMutation,
  useSuspendUserMutation,
  useActivateUserMutation,
  useGetPayoutsQuery,
  useGetApprovedPayoutsQuery,
  useAddPayoutMutation,
  useWalletMutation,
  useMembersMutation,
  useRankingMutation,
  useGetUserRankingMutation,
  useGetBanksMutation,
  useVerifyAccountMutation,
  useGetUserEarningsQuery,
  useGetEarningsTypesQuery,
  useGetPendingUsersMutation,
  useGetNonPendingUsersMutation,
  useGetUserDataAdminMutation,
  useGetUserProfileVerifyMutation,
  useGetUserProfileUnVerifyMutation,
  useFetchUserPaymentProofUploadMutation,
  useGetUserNetworkDataMutation,
  useGetAllEarningsQuery,
  useGetAdminDashboardQuery,
  useUpdatePayoutStatusMutation,
  useFetchBanksQuery,
} = UserApiSlice;
