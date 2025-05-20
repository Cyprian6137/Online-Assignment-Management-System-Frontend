import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token in localStorage and fetch user details
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, you can verify the token with an API call
      // Here we're just decoding the token to get user info (if you are using JWT)
      const decodedUser = JSON.parse(atob(token.split('.')[1])); // Basic JWT decoding
      setUser(decodedUser);
    }
  }, []);

  const login = async (email, password, history) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      setUser(data.user); // Store only user object
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");

      if (data.user.role === "admin") {
        history.push("/admin-dashboard");
      } else if (data.user.role === "lecturer") {
        history.push("/lecturer-dashboard");
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