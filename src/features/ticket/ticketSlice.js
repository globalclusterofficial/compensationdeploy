import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const {} = TicketSlice.actions;

export default TicketSlice.reducer;
