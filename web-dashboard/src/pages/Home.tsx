import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token || !user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-10 w-full max-w-2xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Welcome, {user.name.split(" ")[0]} 👋
          </h1>

          <p className="text-gray-600 text-lg">
            You're logged in as{" "}
            <span className="font-semibold text-gray-800">
              {user.role.toUpperCase()}
            </span>
            . Ready to revolutionize retail with smarter logistics?
          </p>

          <button
            onClick={() => navigate("/redirect", { state: { from: "logout" } })}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-sm font-medium shadow transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
