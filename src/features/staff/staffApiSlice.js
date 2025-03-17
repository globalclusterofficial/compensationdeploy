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
 * BusinessApiSlice is a set of endpoints for authentication-related API calls.
 * @param {globalClusterApi} globalClusterApi - The API object to inject the endpoints into.
 * @returns None
 */
export const StaffApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    staffs: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/staff/",
        method: "GET",
      }),
    }),
    staff: builder.mutation({
      query: (staffId) => ({
        url: `/api/v1/referrals/staff/${staffId}/`,
        method: "GET",
      }),
    }),
    addStaff: builder.mutation({
      query: (staff) => ({
        url: `/api/v1/referrals/staff/`,
        method: "POST",
        body: staff,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    updateStaff: builder.mutation({
      query: (updateData) => ({
        url: `/api/v1/referrals/staff/${updateData.id}/`,
        method: "PATCH",
        body: { ...updateData },
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      }),
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `/api/v1/referrals/staff/${staffId}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useStaffsMutation,
  useStaffMutation,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = StaffApiSlice;
