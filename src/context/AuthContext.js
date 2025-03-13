import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, history) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      setUser(data.user); // Store only user object
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");

      if (data.user.role === "admin") { // Correct role access
        history.push("/admin-dashboard");
      } else {
        history.push("/student-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
      throw error;
    }
  };

  const logout = (history) => {
    setUser(null);
    localStorage.removeItem("token");
    toast.info("Logged out successfully");
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
