import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !employeeId.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://192.168.29.190:5786/api/signup", {
        name,
        email,
        employee_id: employeeId,
        password,
      });

      alert("Signup successful. Please login to continue.");
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error?.response?.data || error.message);
      alert(error?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3"
        />

        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
          className="w-full border border-gray-300 rounded-md px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
