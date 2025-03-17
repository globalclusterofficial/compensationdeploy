import React, { createContext, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import BusinessSignUp from "./components/BusinessSignUp";
import BusinessLayout from "./Layouts/BusinessLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import BusinessDashboard from "./pages/Business/Dashboard";
import BusinessProducts from "./pages/Business/Products"; // loader as productLoader,
import BusinessSettings from "./pages/Business/Settings";
import BusinessSignOut from "./pages/Business/SingOut";
import BusinessSupportTicket from "./pages/Business/SupportTicket";
import Login from "./pages/Login";
import PasswordResetRequestForm from "./components/PasswordResetRequestForm";
import PasswordResetForm from "./components/PasswordResetForm";
import AdminLayout from "./Layouts/AdminLayout";
import UserLayout from "./Layouts/UserLayout";
import AdminBonusManagement from "./pages/Admin/BonusMangement";
import AdminSupportCenter from "./pages/Admin/SupportCenter";
import UserDashboard from "./pages/User/Dashboard";
import UserNetwork from "./pages/User/Network";
import UserPayOut from "./pages/User/Payout";
import UserPermoteAndEArn from "./pages/User/PromoteAndEarn.jsx";
import UserProducts from "./pages/User/Products";
import UserRegister from "./pages/User/Register";
import UserRegistrations from "./pages/User/Registrations";
import UserSettings from "./pages/User/Settings";
import UserSignOut from "./pages/User/SignOut";
import UserSupportTicket from "./pages/User/SupportTicket";
import UserWallet from "./pages/User/Wallet";

import AdminUserRanking from "./pages/Admin/UserRankings";

import AdminPayout from "./pages/Admin/Payout";
import AdminProducts from "./pages/Admin/Products.jsx";

import AdminStaffManagement from "./pages/Admin/StaffManagement";

import AdminBusinessManage from "./pages/Admin/ManageBusiness";

import AdminUserManage from "./pages/Admin/ManageUser";

import AdminUserRegistrations from "./pages/Admin/UserRegistrations";

import AdminBusinessRegistrations from "./pages/Admin/BusinessRegistrations";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import AdminRegister from "./pages/Admin/RegisterIndividual.jsx";
import UserData from "./pages/Admin/UserData";
import UserTree from "./pages/Admin/UserTree";
import Product from "./pages/Product/Product";
import Settings from "./pages/Admin/Settings";
import BusinessData from "./pages/Admin/BusinessData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/password-reset-request",
    element: <PasswordResetRequestForm />,
  },
  {
    path: "/password-reset/:uidb64/:token",
    element: <PasswordResetForm />,
  },
  {
    path: "/business-signup",
    element: <BusinessSignUp />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/product/:productId/",
    element: <Product />,
  },
  {
    path: "/business",
    element: <BusinessLayout />,
    children: [
      {
        path: "dashboard",
        element: <BusinessDashboard />,
      },
      {
        path: "products",
        element: <BusinessProducts />,
      },
      {
        path: "support-ticket",
        element: <BusinessSupportTicket />,
      },
      {
        path: "settings",
        element: <BusinessSettings />,
      },
      {
        path: "sign-out",
        element: <BusinessSignOut />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "network",
        element: <UserNetwork />,
      },
      {
        path: "register",
        element: <UserRegister />,
      },
      {
        path: "registrations",
        element: <UserRegistrations />,
      },
      {
        path: "promote-and-earn",
        element: <UserPermoteAndEArn />,
      },
      {
        path: "products",
        element: <UserProducts />,
      },
      {
        path: "wallet",
        element: <UserWallet />,
      },
      {
        path: "payout",
        element: <UserPayOut />,
      },
      {
        path: "support-ticket",
        element: <UserSupportTicket />,
      },
      {
        path: "settings",
        element: <UserSettings />,
      },
      {
        path: "sign-out",
        element: <UserSignOut />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "user/registrations",
        element: <AdminUserRegistrations />,
      },
      {
        path: "business/registrations",
        element: <AdminBusinessRegistrations />,
      },
      {
        path: "user/manage",
        element: <AdminUserManage />,
      },
      {
        path: "user/manage/:userId/view",
        element: <UserData />,
      },
      {
        path: "user/manage/:userId/tree",
        element: <UserTree />,
      },
      {
        path: "business/manage/:businessId",
        element: <BusinessData />,
      },
      {
        path: "user/manage/registrations",
        element: <AdminRegister />,
      },

      {
        path: "business/manage",
        element: <AdminBusinessManage />,
      },
      {
        path: "staff/management",
        element: <AdminStaffManagement />,
      },
      {
        path: "wallet",
        element: <UserWallet />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },

      {
        path: "payout",
        element: <AdminPayout />,
      },
      {
        path: "user/rankings",
        element: <AdminUserRanking />,
      },
      {
        path: "bonus/management",
        element: <AdminBonusManagement />,
      },
      {
        path: "support/center",
        element: <AdminSupportCenter />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
export const ModalContext = createContext();

/**
 * Functional component representing the main App.
 * It manages the state and provides the store to the components.
 * @returns JSX element representing the main App component.
 */
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`${showModal === true ? "relative" : null}`}>
          <ModalContext.Provider value={{ showModal, setShowModal }}>
            <RouterProvider router={router} />
          </ModalContext.Provider>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
