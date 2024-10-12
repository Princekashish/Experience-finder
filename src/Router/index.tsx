import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../page/HomePage";
import Layout from "../components/shared/Layout";
import Relaxation from "../view/Mood/Relaxation";
import Learning from "../view/Mood/Learning";
import DashboardPage from "../page/DasboardPage";
import ViewExpresion from "../view/ViewExpresion";
import ViewLearning from "../view/ViewLearning";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dasboard", element: <DashboardPage /> },
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
