import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="container mt-4 text-center">
      <h2>👤 Profile</h2>
      <img
        src={user.picture || "/default-profile.png"} // Fallback image
        alt="Profile"
        className="rounded-circle"
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <h3 className="mt-3">{user.name}</h3>
    </div>
  );
};

export default Profile;
