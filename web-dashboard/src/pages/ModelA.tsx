import React from "react";
import Navbar from "../components/Navbar";

export default function ModelA() {
  return (
    <div>
      <Navbar />
      <main className="pt-20 px-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Model A Dashboard</h1>
        <p className="text-gray-600">
          This is a placeholder page for the output of Model A.
        </p>
      </main>
    </div>
  );
}
