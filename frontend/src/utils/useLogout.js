import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function useLogout() {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const logout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch({ type: "LOGOUT" });
      toast.success("Logged out successfully");
      navigate("/signin");
      return true;
    }
    return false;
  };

  return logout;
}
