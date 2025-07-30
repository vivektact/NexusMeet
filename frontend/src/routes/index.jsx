// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import NotificationPage from "../pages/NotificationPage.jsx";

import RootLayout from "../layout/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "landing", element: <LandingPage /> },
          { path: "notification", element: <NotificationPage /> }
        ]
      }
    ]
  }
]);

export default router;
