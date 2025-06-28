import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token || !user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome, {user.name.split(" ")[0]}!
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        You are successfully logged in as <strong>{user.role.toUpperCase()}</strong>
      </p>

      <button
        onClick={() => logout()}
        className="bg-red-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
