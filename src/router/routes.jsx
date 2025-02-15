import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/user/Home";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";

import ProductsList from "../pages/user/products/products-list";
import ProductDetail from "../pages/user/products/product-detail";

import Cart from "../pages/user/payment/cart";
import Booking from "../pages/user/payment/booking";
import BookingSuccess from "../pages/user/payment/booking-success";

import Login from "../pages/Login";

import AdminHome from "../pages/admin/AdminHome";
import AdminProductsList from "../pages/admin/products/products-list";
import AddProduct from "../pages/admin/products/add-product";
import EditProduct from "../pages/admin/products/edit-product";

import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products-list", element: <ProductsList /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "booking", element: <Booking /> },
      { path: "booking-success", element: <BookingSuccess /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "products-list", element: <AdminProductsList /> },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/:id/edit", element: <EditProduct /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
