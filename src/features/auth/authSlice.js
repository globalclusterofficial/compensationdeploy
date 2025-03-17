import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  refresh: null,
  isAuthenticated: false,
  user: { email: null, user_type: null, user_id: null, profile: {} },
  global: null,
};

/**
 * Creates a slice for handling authentication state using Redux Toolkit.
 * @param {string} name - The name of the slice.
 * @param {object} initialState - The initial state of the slice.
 * @param {object} reducers - An object containing reducer functions for login, signup, and logout actions.
 * @returns An auth slice object with login, signup, and logout actions.
 */
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { access, refresh, user } = action.payload;
      state.isAuthenticated = true;
      state.access = access;
      state.refresh = refresh;
      state.user = {
        email: user.email,
        user_type: user.user_type,
        user_id: user.user_id,
        profile: user.profile || {},
      };
    },
    profileAction: (state, action) => {},
    signupAction: (state, action) => {},
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.access = null;
      state.refresh = null;
    },
    updateUserProfileAction: (state, action) => {
      state.user = {
        ...state.user,
        profile: {
          ...state.user.profile,
          profile_picture: action.payload.profile_picture,
          ...action.payload,
        },
      };
    },
    refreshTokenAction: (state, action) => {
      state.access = action.payload.access;
    },
  },
});

export const {
  loginAction,
  profileAction,
  signupAction,
  logoutAction,
  updateUserProfileAction,
  refreshTokenAction,
} = AuthSlice.actions;

export default AuthSlice.reducer; // Ensure this is correctly exported

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectGlobal = (state) => state.auth.global;
export const selectAccessToken = (state) => state.auth.access;
export const selectRefreshToken = (state) => state.auth.refresh;
