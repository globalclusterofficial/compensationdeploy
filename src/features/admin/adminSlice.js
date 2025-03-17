import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  refresh: null,
  isAuthenticated: false,
  user: {
    email: null,
    user_type: null,
    user_id: null,
  },
  global: null,
};
/**
 * Creates a slice for handling authentication state using Redux Toolkit.
 * @param {string} name - The name of the slice.
 * @param {object} initialState - The initial state of the slice.
 * @param {object} reducers - An object containing reducer functions for login, signup, and logout actions.
 * @returns An auth slice object with login, signup, and logout actions.
 */
const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export const {} = AdminSlice.actions;

export default AdminSlice.reducer; // Ensure this is correctly exported
