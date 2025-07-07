import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function RedirectWithMessage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isLogout = location.state?.from === "logout";

  useEffect(() => {
    if (isLogout) logout();

    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, logout, isLogout]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      <motion.div
      key="home"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      style={{ padding: "2rem" }}
    >
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-md rounded-xl p-8 text-center space-y-4 max-w-md w-full">
          {isLogout ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800">Logging out...</h2>
              <p className="text-gray-500 text-sm">Redirecting to login shortly.</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800">Login Required</h2>
              <p className="text-gray-500">You must be logged in to access this page.</p>
              <p className="text-sm text-gray-400">Redirecting to login...</p>
            </>
          )}
        </div>
      </div>
      </motion.div>
    </div>
  );
}
