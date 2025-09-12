import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../features/auth/LoginScreen.tsx";

import MainLayout from "../components/layout/MainLayout";
// import Dashboard from "../features/dashboard/Dashboard"; // Crie este componente depois

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/clientes",
    element: <MainLayout />,
    // children: [
    //   {
    //     index: true,
    //     element: <Dashboard />,
    //   },
    // ],
  },
]);
