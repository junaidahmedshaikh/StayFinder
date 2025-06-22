import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import BookingPage from "./pages/BookingPage.jsx";
import CreateListing from "./pages/CreatingListing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SearchPage from "./pages/SearchResult.jsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/booking/:id",
        element: <BookingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/property/:id",
        element: <PropertyDetail />,
      },
      {
        path: "/property/booking/:id",
        element: <BookingPage />,
      },
      {
        path: "/property/create",
        element: <CreateListing />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ],
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>
);
