import { createRoot } from "react-dom/client";
import "./App.css";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./Store/Store.js";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import AuthLayout from "./AuthLayout.jsx";
import UrlList from "./pages/urlList.jsx";
import PublicRoute from "./PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: (  <AuthLayout><Home /></AuthLayout> )},
      {
        path: "/login",
        element:  ( <PublicRoute> <Login /> </PublicRoute>),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: '/all-urls',
        element: (
          <AuthLayout >
            <UrlList/>
          </AuthLayout>
        )
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
