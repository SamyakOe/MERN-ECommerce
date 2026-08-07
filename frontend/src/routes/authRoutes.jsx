import AuthLayout from "../layouts/AuthLayout.jsx";
import { AuthRoute } from "./wrappers.jsx";
import SignIn from "../auth/pages/SignIn.jsx";
import Register from "../auth/pages/Register.jsx";

export const authRoutes = {
  element: <AuthRoute><AuthLayout /></AuthRoute>,
  children: [
    { path: "signin", element: <SignIn /> },
    { path: "register", element: <Register /> },
  ],
}