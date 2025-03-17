import { globalClusterApi } from "../api/apiSlice";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

/**
 * AdminApiSlice is a set of endpoints for authentication-related API calls.
 * @param {globalClusterApi} globalClusterApi - The API object to inject the endpoints into.
 * @returns None
 */
export const AdminApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    // signupAdmin: builder.mutation({
    //   query: (signupData) => ({
    //     url: "/register/company/",
    //     method: "POST",
    //     body: signupData,
    //   }),
    // }),
    loginAdmin: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/accounts/token/",
        method: "POST",
        body: loginData,
      }),
    }),
    resetPasswordAdmin: builder.mutation({
      query: ({ resetPasswordData, token }) => ({
        url: `/register/company/reset/${token}`,
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    forgotPasswordAdmin: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/register/company/forgot",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useResetPasswordAdminMutation,
  useForgotPasswordAdminMutation,
} = AdminApiSlice;
