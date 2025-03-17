import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const {} = ProductSlice.actions;

export default ProductSlice.reducer;
