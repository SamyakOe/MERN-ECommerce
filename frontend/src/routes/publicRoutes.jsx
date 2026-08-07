import HomePage from "../features/shop/pages/HomePage";
import Shop from "../features/shop/pages/Shop";
import About from "../features/shop/pages/About";
import Contact from "../features/shop/pages/Contact";
import ProductDetails from "../features/shop/pages/ProductDetails";
import CartPage from "../features/shop/pages/CartPage";
import Checkout from "../features/shop/pages/CheckOut";
import OrderConfirmation from "../features/shop/pages/OrderConfirmation";
import EsewaSuccess from "../features/shop/pages/EsewaSuccess";
import KhaltiSuccess from "../features/shop/pages/KhaltiSuccess";
import RootLayout from "../layouts/RootLayout";
import { ProtectedRoute , UserRoute} from "./wrappers.jsx"; // wrapper components
import MyOrders from "../features/shop/pages/MyOrders.jsx";

export const publicRoutes = {
  path: "/",
  element: <RootLayout />, // no wrapper here
  children: [
    { index: true, element: <HomePage /> },
    { path: "shop", element: <UserRoute><Shop /></UserRoute> },
    { path: "product/:id", element: <UserRoute><ProductDetails /></UserRoute> },
    { path: "about", element: <About /> },
    { path: "contact", element: <Contact /> },
    { path: "cart", element: <UserRoute><ProtectedRoute><CartPage /></ProtectedRoute></UserRoute> },
    { path: "my-orders", element: <UserRoute><ProtectedRoute><MyOrders /></ProtectedRoute></UserRoute> },
    { path: "checkout", element: <UserRoute><ProtectedRoute><Checkout /></ProtectedRoute></UserRoute> },
    { path: "order-confirmation/:orderId", element: <UserRoute><ProtectedRoute><OrderConfirmation /></ProtectedRoute></UserRoute> },
    { path: "payment/esewa/success", element: <UserRoute><ProtectedRoute><EsewaSuccess /></ProtectedRoute></UserRoute> },
    { path: "payment/khalti/success", element: <UserRoute><ProtectedRoute><KhaltiSuccess /></ProtectedRoute></UserRoute> },
  ],
};

