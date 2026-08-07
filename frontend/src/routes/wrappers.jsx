import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

// ✅ Blocks unauthenticated users
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) return <Loading/>;
  return user ? children : <Navigate to="/signin" replace />;
};

// ✅ Allows only admins
export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) return <Loading/>;
  if (!user) return <Navigate to="/signin" replace />;
  return user.isAdmin ? children : <Navigate to="/" replace />;
};

// ✅ Allows only non‑admin logged‑in users
export const UserRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) return <Loading/>;
  return !user?.isAdmin ? children : <Navigate to="/admin/dashboard" replace />;
};

// ✅ Allows only unauthenticated visitors
export const AuthRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) return <Loading/>;
  return !user ? children : <Navigate to="/" replace />;
};
