// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";

// export default function Login() {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!identifier.trim() || !password.trim()) {
//       alert("Please enter all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://54.197.3.23:5786/api/login", {
//         identifier,
//         password,
//       });

//       const { token, user } = response.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       login(token, user);
//       navigate("/"); // redirect to home/dashboard
//     } catch (error: any) {
//       console.error("Login error:", error?.response?.data || error.message);
//       alert(error?.response?.data?.error || "Login failed");
//     }
//   };

//   return (
    
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//         <Navbar />
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
//         <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>

//         <input
//           type="text"
//           placeholder="Email or Employee ID"
//           value={identifier}
//           onChange={(e) => setIdentifier(e.target.value)}
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
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
//         >
//           Log In
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-blue-600 underline font-medium"
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { motion } from "framer-motion";

// export default function Login() {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!identifier.trim() || !password.trim()) {
//       alert("Please enter all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://54.197.3.23:5786/api/login", {
//         identifier,
//         password,
//       });

//       const { token, user } = response.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       login(token, user);
//       navigate("/");
//     } catch (error: any) {
//       console.error("Login error:", error?.response?.data || error.message);
//       alert(error?.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left: Branding Side */}     
//       <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 to-emerald-800 text-white items-center justify-center px-12">
//         <div className="space-y-6">
//           <h1 className="text-5xl font-extrabold tracking-tight leading-tight">Sanchaya</h1>
//           <p className="text-lg max-w-md">
//             Redefining sustainability with AI-driven food distribution.
//           </p>
//         </div>
//       </div>

//       {/* Right: Login Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8">
//       <motion.div
//       key="home"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{ duration: 1 }}
//       style={{ padding: "10rem" }}
//     >
//       <div className="space-y-8">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 text-center">Sign in to your account</h2>
//             <p className="text-sm text-gray-500 text-center mt-2">
//               Welcome back! Please enter your credentials.
//             </p>
//           </div>

//           <div className="space-y-5">
//             <input
//               type="text"
//               placeholder="Email or Employee ID"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
//             />

//             <button
//               onClick={handleLogin}
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition"
//             >
//               Log In
//             </button>
//           </div>

//           <div className="text-center text-sm text-gray-500">
//             Don’t have an account?{" "}
//             <button
//               onClick={() => navigate("/signup")}
//               className="text-green-600 hover:underline font-medium"
//             >
//               Sign up
//             </button>
//           </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      alert("Please enter all fields");
      return;
    }

    try {
      const response = await axios.post("http://54.197.3.23:5786/api/login", {
        identifier,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      login(token, user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      alert(error?.response?.data?.error || "Login failed");
    }
  };
  return (
    <div className="min-h-screen w-full relative bg-[#5b9152] flex overflow-hidden">
      
      {/* Left Panel - stays flat in background */}
      <div className="w-1/2 flex items-center justify-center pl-12 pr-8 z-0">
        <div className="max-w-md text-white">
          <h1 className="text-6xl font-bold font-lexend mb-5">Sanchaya</h1>
          <h2 className="text-2xl font-semibold mb-5">Redefining Sustainability</h2>
          <p className="text-base leading-relaxed tracking-wide">
            With AI-driven food distribution, Sanchaya is at the forefront of sustainable innovation. Our platform ensures efficient delivery and minimizes waste, paving the way for a greener future.
          </p>
        </div>
      </div>
  
      {/* Right Panel - curved and floating over left */}
      <div className="absolute top-0 right-0 h-full w-[45%] bg-[#dcf5db] rounded-l-[180px] shadow-2xl z-10 flex items-center justify-center px-12">
        <motion.div
          key="login"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md py-12"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
            <p className="text-sm text-gray-600 mt-2">
              Welcome back! Please enter your credentials.
            </p>
          </div>
  
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Email or Employee ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
            />
  
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
            />
  
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition"
            >
              Login
            </button>
  
            <div className="text-center text-sm text-gray-600 pt-1">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-green-700 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
  
  

//   return (
//     <div className="min-h-screen flex">
//       {/* Left: Brand Panel */}
//       <div className="hidden md:flex w-1/2 bg-[#5b9152] items-center justify-center">
//         <div className="px-12 text-left w-full max-w-md">
//           <div className="text-5xl font-lexend text-white mb-6">Sanchaya</div>
//           <h2 className="text-lg font-semibold text-white mb-4">
//             Redefining Sustainability
//           </h2>
//           <p className="text-white text-sm leading-relaxed">
//             With AI-driven food distribution, Sanchaya is at the forefront of sustainable innovation. Our platform ensures efficient delivery and minimizes waste, paving the way for a greener future.
//           </p>
//         </div>
//       </div>
  
//       {/* Right: Login Form */}
//       <div className="w-full md:w-1/2 bg-[#dcf5db] flex items-center justify-center">
//         <motion.div
//           key="login"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -30 }}
//           transition={{ duration: 1 }}
//           className="w-full max-w-md p-8"
//         >
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-center text-gray-800">
//               Sign in to your account
//             </h2>
//             <p className="text-sm text-gray-500 text-center mt-2">
//               Welcome back! Please enter your credentials.
//            </p>
//           </div>
  
//           <div className="space-y-6">
//   <input
//     type="text"
//     placeholder="Email or Employee ID"
//     value={identifier}
//     onChange={(e) => setIdentifier(e.target.value)}
//     className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
//   />

//   <input
//     type="password"
//     placeholder="Enter your password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"
//   />

//   <button
//     onClick={handleLogin}
//     className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition"
//   >
//     Login
//   </button>

//   <div className="text-center text-sm text-gray-600 pt-1">
//     Don’t have an account?{" "}
//     <button
//       onClick={() => navigate("/signup")}
//       className="text-green-700 font-semibold hover:underline"
//     >
//       Sign Up
//     </button>
//   </div>
// </div>


//         </motion.div>
//       </div>
//     </div>
//   );
  
}
