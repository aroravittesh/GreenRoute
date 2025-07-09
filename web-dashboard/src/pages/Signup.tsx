// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [employeeId, setEmployeeId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     if (!name.trim() || !email.trim() || !employeeId.trim() || !password.trim()) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.29.190:5786/api/signup", {
//         name,
//         email,
//         employee_id: employeeId,
//         password,
//       });

//       alert("Signup successful. Please login to continue.");
//       navigate("/login");
//     } catch (error: any) {
//       console.error("Signup error:", error?.response?.data || error.message);
//       alert(error?.response?.data?.error || "Signup failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-white px-4">
//         <Navbar />
//       <div className="w-full max-w-md space-y-6">
//         <h1 className="text-3xl font-bold text-center">Sign Up</h1>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-4 py-3"
//         />

//         <input
//           type="text"
//           placeholder="Employee ID"
//           value={employeeId}
//           onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
//           className="w-full border border-gray-300 rounded-md px-4 py-3"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-4 py-3"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-4 py-3"
//         />

//         <button
//           onClick={handleSignup}
//           className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition"
//         >
//           Sign Up
//         </button>

//         <p className="text-center">
//           Already have an account?{" "}
//           <button
//             onClick={() => navigate("/login")}
//             className="text-green-600 underline"
//           >
//             Log In
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

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
      <div className="min-h-screen flex">
        {/* Left Branding Panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 to-emerald-800 text-white items-center justify-center px-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">Join Sanchaya</h1>
            <p className="text-lg max-w-md">
              Revolutionizing sustainable supply chains through AI-powered forecasting.
            </p>
          </div>
        </div>
    
        {/* Right Signup Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8">
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1 }}
            className="max-w-md w-full"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 text-center">Create your account</h2>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Get started with the platform
                </p>
              </div>
    
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
                />
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
                />
                <button
                  onClick={handleSignup}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition"
                >
                  Sign Up
                </button>
              </div>
    
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-green-600 hover:underline font-medium"
                >
                  Log In
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
    
 
}
