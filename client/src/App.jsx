import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AdminLayout from "./layouts/AdminLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthContextProvider from "./context/AuthContext";
import AddProductPage from "./pages/AddProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditProductPage from "./pages/editProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products/add",
        element: <AddProductPage />,
      },
      {
        path: "products/edit/:id",
        element: <EditProductPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}
export default App;
