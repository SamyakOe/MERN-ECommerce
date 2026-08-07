import { createContext, useContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("isAdmin", action.payload.isAdmin ? "true" : "false");
      return { user: action.payload };
    case "LOGOUT":
      localStorage.clear();
      return { user: null };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    // simulate async check (replace with API if needed)
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          token,
          userId: localStorage.getItem("userId"),
          isAdmin: localStorage.getItem("isAdmin") === "true",
        },
      });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};
