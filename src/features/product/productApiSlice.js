import { globalClusterApi } from "../api/apiSlice";

export const ProductApiSlice = globalClusterApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/products/",
        method: "GET",
      }),
    }),
    nonPendingPoducts: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/products/get_non_pending_products/",
        method: "GET",
      }),
    }),
    pendingPoducts: builder.mutation({
      query: () => ({
        url: "/api/v1/referrals/products/get_pending_products/",
        method: "GET",
      }),
    }),
    product: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/referrals/products/${productId}/`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/referrals/products/${productId}/`,
        method: "DELETE",
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: `/api/v1/referrals/products/`,
        method: "POST",
        body: product,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ uuid, data }) => ({
        url: `/api/v1/referrals/products/${uuid}/`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    shareProduct: builder.mutation({
      query: (data) => ({
        url: `/api/v1/referrals/product/share/`,
        method: "POST",
        body: data,
      }),
    }),
    shareProductRequest: builder.mutation({
      query: (data) => ({
        url: "/api/v1/referrals/product/share-request/",
        method: "POST",
        body: data,
      }),
    }),
    shareApproval: builder.mutation({
      query: (data) => ({
        url: "/api/v1/referrals/product/share-approval/",
        method: "POST",
        body: data,
      }),
    }),
    approveProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/referrals/products/update_reg_status/`,
        method: "PATCH",
        body: JSON.stringify({
          productId,
          status: "active",
        }),
      }),
    }),
    declineProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/v1/referrals/products/update_reg_status/`,
        method: "PATCH",
        body: JSON.stringify({
          productId,
          status: "declined",
        }),
      }),
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/api/v1/referrals/products/get_product?productId=${productId}`,
        method: "GET",
      }),
    }),
    getUserShareBonuses: builder.query({
      query: () => ({
        url: `/api/v1/referrals/products/get_user_share_bonuses`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useProductsMutation,
  useNonPendingPoductsMutation,
  usePendingPoductsMutation,
  useProductMutation,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useShareProductMutation,
  useShareProductRequestMutation,
  useShareApprovalMutation,
  useApproveProductMutation,
  useDeclineProductMutation,
  useGetProductQuery,
  useGetUserShareBonusesQuery,
} = ProductApiSlice;
