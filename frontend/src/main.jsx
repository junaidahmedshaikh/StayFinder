import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import CreateListing from "./pages/CreatingListing.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchPage from "./pages/SearchResult.jsx";
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
        path: "/property/id",
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
    ],
    errorElement: <NotFound />,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);
