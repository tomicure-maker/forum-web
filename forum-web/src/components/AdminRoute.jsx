import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService.js";

export default function AdminRoute({ children }) {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const updateUser = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("forum-auth-changed", updateUser);

    return () => {
      window.removeEventListener("forum-auth-changed", updateUser);
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== "superadmin") {
    return <Navigate to="/" replace />;
  }

  return children;
}