import React from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout(history);
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger fw-bold w-100 mt-3 shadow-sm"
    >
      🚪 Logout
    </button>
  );
};

export default LogoutButton;
