import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import api from "../../api/axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
export default function SignIn() {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signin", formData);
      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data.accessToken,
          userId: response.data.user.id,
          isAdmin: response.data.user.isAdmin
        }
      });

      toast.success("Login Successfull");

      //Redirect to home page
      setTimeout(() => {
        if (localStorage.getItem("isAdmin")==="true") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="bg-neutral-50">
      <div className="flex flex-col justify-center items-center w-full h-dvh">
        <NavLink to="/">
          <div className="text-2xl font-bold mb-8">LOGO</div>
        </NavLink>
        <div className="rounded-xl flex flex-col gap-1 bg-white shadow-sm border-neutral-200 border px-6 py-8 max-w-sm w-full">
          <span className="text-lg font-bold">Welcome Back</span>
          <span className="text-sm text-neutral-500">
            Sign in to continue shopping
          </span>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col mt-4 gap-2"
          >
            <label className="text-sm font-normal">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl py-2 px-4 text-sm focus:border-black focus:outline-none"
            />
            <label className="text-sm font-normal">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                className="w-full border bg-white border-neutral-200 rounded-xl py-2 px-4 text-sm focus:border-black focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-5 top-2 text-neutral-400  bg-white hover:text-black "
              >
                {showPassword ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-black text-white py-2 px-4 mt-2 hover:bg-neutral-800 cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
        <span className="text-sm text-neutral-500 mt-6">
          New User?{" "}
          <NavLink to="/register">
            <span className="text-black font-medium hover:underline decoration-2 cursor-pointer">
              Create an Account
            </span>
          </NavLink>
        </span>
      </div>
    </div>
  );
}
