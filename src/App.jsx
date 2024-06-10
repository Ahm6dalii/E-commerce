import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./context/userContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CardContexProvider from "./context/CardContext";
import toast, { Toaster } from "react-hot-toast";
import CategoriesDetails from "./components/CategoriesDetails/CategoriesDetails";
import Checkout from "./components/Checkout/Checkout";
import WishList from "./components/WishList/WishList";
import WishListProvider, { WishListContext } from "./context/WishLIstContext";
import ResetPassword from './components/ResetPassword/ResetPassword';
import VerfiyCode from './components/VerfiyCode/VerfiyCode';
import UpdataUserPass from './components/UpdataUserPass/UpdataUserPass';

let query = new QueryClient();

let router = createBrowserRouter([
  {
    path: "/E-commerce/",
    element: <Layout />,
    children: [
      {
       path:"/E-commerce/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "reset-Password",
        element: (
            <ResetPassword />
        ),
      },
      {
        path: "verfiy-code",
        element: (
            <VerfiyCode/>
        ),
      },
      {
        path: "update-pass",
        element: (
            <UpdataUserPass/>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/:id",
        element: (
          <ProtectedRoute>
            <CategoriesDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wish-list",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return (
    <>
            <UserContextProvider>
      <CardContexProvider>
        <WishListProvider>
          <QueryClientProvider client={query}>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
            <ReactQueryDevtools></ReactQueryDevtools>
          </QueryClientProvider>
        </WishListProvider>
      </CardContexProvider>
            </UserContextProvider>
    </>
  );
}

export default App;
