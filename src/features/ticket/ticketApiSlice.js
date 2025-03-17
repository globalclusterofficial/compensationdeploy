import { globalClusterApi } from "../api/apiSlice";

export const TicketApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    tickets: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/supporttickets/",
        method: "GET",
      }),
    }),
    ticket: builder.mutation({
      query: (ticketId) => ({
        url: `/api/v1/referrals/supporttickets/${ticketId}/`,
        method: "GET",
      }),
    }),
    updateTicket: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/referrals/supporttickets/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    addTicket: builder.mutation({
      query: (ticket) => ({
        url: "/api/v1/referrals/supporttickets/",
        method: "POST",
        body: ticket,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    deleteTicket: builder.mutation({
      query: (ticketId) => ({
        url: `/api/v1/referrals/supporttickets/${ticketId}/`,
        method: "DELETE",
      }),
    }),
    replyTicket: builder.mutation({
      query: ({ ticketId, data }) => ({
        url: `/api/v1/referrals/supportticketreplies/`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    deleteReply: builder.mutation({
      query: (replyId) => ({
        url: `/api/v1/referrals/supportticketreplies/${replyId}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useTicketsMutation,
  useTicketMutation,
  useUpdateTicketMutation,
  useAddTicketMutation,
  useDeleteTicketMutation,
  useReplyTicketMutation,
  useDeleteReplyMutation,
} = TicketApiSlice;
