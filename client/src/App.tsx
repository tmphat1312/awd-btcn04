import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./layouts/Main";
import { HomeRoute } from "./routes/Home";
import { LoginRoute } from "./routes/Login";
import { ProfileRoute } from "./routes/Profile";
import { RegisterRoute } from "./routes/Register";
import { PublicLayout } from "./layouts/Public";
import { ProtectedLayout } from "./layouts/Protected";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/login",
            element: <LoginRoute />,
          },
          {
            path: "/register",
            element: <RegisterRoute />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/profile",
            element: <ProfileRoute />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
