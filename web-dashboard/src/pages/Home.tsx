import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!token || !user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <motion.div
      key="home"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
      style={{ padding: "2rem" }}
    >
      <main className="pt-24 px-8 max-w-7xl mx-auto space-y-28">

        {/* Header */}
        <section className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome, {user.name.split(" ")[0]}
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            This dashboard guides you through GreenRoute’s AI-driven retail optimization.
            Explore model-based insights to minimize food waste and streamline distribution.
          </p>
        </section>

        {/* Model A Section */}
        <section className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Demand Forecasting</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Uses Prophet to forecast 30-day product demand at the top-performing stores.
              Helps predict which store will need how much stock in the coming month.
              Trained using historical sales from the FreshRetailNet-50K dataset.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3281/3281306.png"
            alt="Demand Forecasting"
            className="w-80 h-auto object-contain rounded-xl shadow"
          />
        </section>

        {/* Model B Section */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Spoilage Simulation</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Simulates product spoilage over time using FIFO and optimized routing. Compares
              how intelligent redistribution can reduce waste. Works best with perishable goods.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991045.png"
            alt="Spoilage Simulation"
            className="w-80 h-auto object-contain rounded-xl shadow"
          />
        </section>

        {/* Model C Section */}
        <section className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Optimized Distribution</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Runs optimization logic to determine ideal shipment plans from the central warehouse
              to all stores. Helps reduce overstocking, spoilage, and unnecessary logistics.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4363/4363708.png"
            alt="Smart Distribution"
            className="w-80 h-auto object-contain rounded-xl shadow"
          />
        </section>

        {/* Footer */}
        <section className="text-center pb-20">
          <p className="text-gray-600 text-sm">
            Built for GreenRoute | Powered by AI | Last synced: {new Date().toLocaleDateString()}
          </p>
        </section>
      </main>
      </motion.div>
    </div>
  );
}
