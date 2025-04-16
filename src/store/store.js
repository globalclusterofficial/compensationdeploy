/**
 * Configures and creates a Redux store with persisted state using redux-persist.
 * @returns {Object} An object containing the Redux store and persistor.
 */
import { configureStore } from "@reduxjs/toolkit";
import {
  globalClusterReducer,
  globalClusterMiddleware,
} from "../features/api/apiSlice";
import { globalClusterApi } from "../features/api/apiSlice"; // Ensure correct import

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import localStorage from "redux-persist/lib/storage"; // Correct import for localStorage
import { WEBSITE_NAME } from "../lib/constants";

import AuthReducer from "../features/auth/authSlice"; // Ensure this is a default export
import ProductReducer from "../features/product/productSlice"; // Ensure this is a default export
import UserReducer from "../features/user/userSlice"; // Ensure this is a default export
import TicketReducer from "../features/ticket/ticketSlice"; // Ensure this is a default export
import AdminReducer from "../features/admin/adminSlice"; // Ensure this is a default export
import BusinessReducer from "../features/business/businessSlice";
// Auth persistence configuration
const authPersistConfig = {
  key: `${WEBSITE_NAME}:auth`,
  storage: localStorage,
  serialize: JSON.stringify,
};

// Session persistence configuration
const sessionPersistConfig = {
  key: `${WEBSITE_NAME}:session`,
  storage: sessionStorage,
  serialize: JSON.stringify,
};

// Apply persistReducer to AuthReducer
const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);

const rootReducer = {
  api: globalClusterReducer,
  [globalClusterApi.reducerPath]: globalClusterApi.reducer,
  auth: persistedAuthReducer,
  product: persistReducer(
    { key: `${WEBSITE_NAME}:product`, ...sessionPersistConfig },
    ProductReducer,
  ),
  ticket: persistReducer(
    { key: `${WEBSITE_NAME}:ticket`, ...sessionPersistConfig },
    TicketReducer,
  ),
  user: persistReducer(
    { key: `${WEBSITE_NAME}:user`, ...sessionPersistConfig },
    UserReducer,
  ),
  admin: persistReducer(
    { key: `${WEBSITE_NAME}:user`, ...sessionPersistConfig },
    AdminReducer,
  ),
  business: persistReducer(
    { key: `${WEBSITE_NAME}:user`, ...sessionPersistConfig },
    BusinessReducer,
  ),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(globalClusterMiddleware),
  devTools: true,
  // devTools: process.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
