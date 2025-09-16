import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../features/auth/LoginScreen.tsx";

import MainLayout from "../components/layout/MainLayout";
import { lazy, Suspense } from "react";
const ClientsPage = lazy(() => import("clientsApp/ClientsMfe"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/clientes/*",
    element: <MainLayout />,
    children: [
      {
        path: "*",
        element: (
          <Suspense
            fallback={
              <div className="p-6 font-semibold">
                Carregando MFE de Clientes...
              </div>
            }
          >
            <ClientsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
