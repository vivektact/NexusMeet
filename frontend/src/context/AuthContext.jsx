import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ Needed to redirect

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/"); // ✅ Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
