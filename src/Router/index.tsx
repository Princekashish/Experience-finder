import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../page/HomePage";
import Layout from "../components/shared/Layout";
import Relaxation from "../view/Mood/Relaxation";
import Learning from "../view/Mood/Learning";
import ViewExpresion from "../view/ViewExpresion";
import ViewLearning from "../view/ViewLearning";
import LoginForm from "../components/shared/Form/LoginForm";
import SignUpForm from "../components/shared/Form/SignupForm";
import DashboardPage from "../page/DashboardPage";
import PricingPage from "../page/Payment";
import ProfilePage from "../page/Profile";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth/login", element: <LoginForm /> },
      { path: "/auth/signup", element: <SignUpForm /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/payment", element: <PricingPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/dashboard/relaxation", element: <Relaxation /> },
      { path: "/dashboard/learning", element: <Learning /> },
      { path: "/dashboard/:id", Component: ViewExpresion },
      { path: "/dashboard/Learning/:id", Component: ViewLearning },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
