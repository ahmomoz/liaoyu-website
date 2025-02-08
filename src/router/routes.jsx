import Home from "../pages/user/Home";

import ProductsList from "../pages/user/products/products-list";
import ProductDetail from "../pages/user/products/product-detail";

import Cart from "../pages/user/payment/cart";
import Booking from "../pages/user/payment/booking";
import BookingSuccess from "../pages/user/payment/booking-success";

import AdminHome from "../pages/admin/AdminHome";
import AdminProductsList from "../pages/admin/products/products-list";
import Login from "../pages/Login";

import NotFound from "../pages/NotFound";

export const routes = [
  { path: "/", element: <Home /> },

  { path: "/products-list", element: <ProductsList /> },
  { path: "/product/:id", element: <ProductDetail /> },

  { path: "/cart", element: <Cart /> },
  { path: "/booking", element: <Booking /> },
  { path: "/booking-success", element: <BookingSuccess /> },

  { path: "/login", element: <Login /> },

  { path: "/admin", element: <AdminHome /> },
  { path: "/admin/products-list", element: <AdminProductsList /> },

  { path: "*", element: <NotFound /> },
];
