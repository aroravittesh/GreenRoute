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
//       const response = await axios.post("https://sanchaya.live/api/signup", {
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


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";

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
//       const response = await axios.post("https://sanchaya.live/api/signup", {
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
//       <div className="min-h-screen flex">
//         {/* Left Branding Panel */}
//         <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 to-emerald-800 text-white items-center justify-center px-12">
//           <div className="space-y-6">
//             <h1 className="text-5xl font-extrabold tracking-tight leading-tight">Join Sanchaya</h1>
//             <p className="text-lg max-w-md">
//               Revolutionizing sustainable supply chains through AI-powered forecasting.
//             </p>
//           </div>
//         </div>
    
//         {/* Right Signup Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8">
//           <motion.div
//             key="signup"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 1 }}
//             className="max-w-md w-full"
//           >
//             <div className="space-y-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800 text-center">Create your account</h2>
//                 <p className="text-sm text-gray-500 text-center mt-2">
//                   Get started with the platform
//                 </p>
//               </div>
    
//               <div className="space-y-5">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Employee ID"
//                   value={employeeId}
//                   onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"
//                 />
//                 <button
//                   onClick={handleSignup}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition"
//                 >
//                   Sign Up
//                 </button>
//               </div>
    
//               <div className="text-center text-sm text-gray-500">
//                 Already have an account?{" "}
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="text-green-600 hover:underline font-medium"
//                 >
//                   Log In
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
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

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim() || !email.trim() || !employeeId.trim() || !password.trim()) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://sanchaya.live/api/signup", {
        name,
        email,
        employee_id: employeeId,
        password,
      });

      setSuccessMsg("Signup successful. Please login to continue.");
      navigate("/login"); 
    } catch (error: any) {
      console.error("Signup error:", error?.response?.data || error.message);
      setErrorMsg(error?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-[#5b9152] flex overflow-hidden">
      {/* Left Panel - matches Login layout */}
      <div className="w-1/2 flex items-center justify-center pl-12 pr-8 z-0">
        <div className="max-w-md text-white">
          <h1 className="text-6xl font-bold font-lexend mb-5">Join Sanchaya</h1>
          <p className="text-lg max-w-md">
               Revolutionizing sustainable supply chains through <br></br> AI-powered forecasting.
             </p>
        </div>
      </div>

      {/* Right Panel - curved floating card (identical structure to Login) */}
      <div className="absolute top-0 right-0 h-full w-[45%] bg-[#dcf5db] rounded-l-[180px] shadow-2xl z-10 flex items-center justify-center px-12">
        <motion.div
          key="signup"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md py-12"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
            <p className="text-sm text-gray-600 mt-2">Get started with the platform.</p>
          </div>

          {/* Animated inline notices */}
          <div className="space-y-3 mb-4">
            {errorMsg && (
              <motion.div
                key={`err-${errorMsg}`}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full border border-red-300 bg-red-50 text-red-800 rounded-xl px-4 py-3 text-sm"
                role="status"
                aria-live="polite"
              >
                {errorMsg}
              </motion.div>
            )}
            {successMsg && (
              <motion.div
                key={`ok-${successMsg}`}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full border border-green-300 bg-green-50 text-green-800 rounded-xl px-4 py-3 text-sm"
                role="status"
                aria-live="polite"
              >
                {successMsg}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
            />

            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
            />

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
            />

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <div className="text-center text-sm text-gray-600 pt-1">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-green-700 font-semibold hover:underline"
              >
                Log In
              </button>
              {successMsg && (
                <div className="mt-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm px-4 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
