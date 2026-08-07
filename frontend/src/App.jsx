import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { adminRoutes } from "./routes/adminRoutes";
import { authRoutes } from "./routes/authRoutes";
import { publicRoutes } from "./routes/publicRoutes";
export default function App() {
  const routes = [adminRoutes, authRoutes, publicRoutes];
  const router = createBrowserRouter(routes);
  return (
    <>
      <ProductProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            containerStyle={{
              right: 32,
            }}
          />
        </AuthContextProvider>
      </ProductProvider>
    </>
  );
}
