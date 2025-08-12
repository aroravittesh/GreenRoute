"use strict";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var AuthContext_1 = require("../context/AuthContext");
var framer_motion_1 = require("framer-motion");
function Login() {
    var _this = this;
    var _a = (0, react_1.useState)(""), identifier = _a[0], setIdentifier = _a[1];
    var _b = (0, react_1.useState)(""), password = _b[0], setPassword = _b[1];
    var login = (0, AuthContext_1.useAuth)().login;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleLogin = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, _a, token, user, error_1;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!identifier.trim() || !password.trim()) {
                        alert("Please enter all fields");
                        return [2 /*return*/];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("http://54.197.3.23:5786/api/login", {
                            identifier: identifier,
                            password: password,
                        })];
                case 2:
                    response = _e.sent();
                    _a = response.data, token = _a.token, user = _a.user;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    login(token, user);
                    navigate("/");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _e.sent();
                    console.error("Login error:", ((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data) || error_1.message);
                    alert(((_d = (_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) || "Login failed");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen w-full relative bg-[#5b9152] flex overflow-hidden">
      
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
        <framer_motion_1.motion.div key="login" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }} className="w-full max-w-md py-12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
            <p className="text-sm text-gray-600 mt-2">
              Welcome back! Please enter your credentials.
            </p>
          </div>
  
          <div className="space-y-6">
            <input type="text" placeholder="Email or Employee ID" value={identifier} onChange={function (e) { return setIdentifier(e.target.value); }} className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"/>
  
            <input type="password" placeholder="Enter your password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="w-full px-4 py-2.5 text-base rounded-xl border border-gray-300 bg-white placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 ease-in-out"/>
  
            <button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition">
              Login
            </button>
  
            <div className="text-center text-sm text-gray-600 pt-1">
              Don’t have an account?{" "}
              <button onClick={function () { return navigate("/signup"); }} className="text-green-700 font-semibold hover:underline">
                Sign Up
              </button>
            </div>
          </div>
        </framer_motion_1.motion.div>
      </div>
    </div>);
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
