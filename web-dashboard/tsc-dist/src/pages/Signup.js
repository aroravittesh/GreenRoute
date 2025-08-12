"use strict";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
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
exports.default = Signup;
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
//       const response = await axios.post("http://54.197.3.23:5786/api/signup", {
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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var framer_motion_1 = require("framer-motion");
function Signup() {
    var _this = this;
    var _a = (0, react_1.useState)(""), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(""), employeeId = _b[0], setEmployeeId = _b[1];
    var _c = (0, react_1.useState)(""), email = _c[0], setEmail = _c[1];
    var _d = (0, react_1.useState)(""), password = _d[0], setPassword = _d[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleSignup = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!name.trim() || !email.trim() || !employeeId.trim() || !password.trim()) {
                        alert("Please fill in all fields");
                        return [2 /*return*/];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("http://54.197.3.23:5786/api/signup", {
                            name: name,
                            email: email,
                            employee_id: employeeId,
                            password: password,
                        })];
                case 2:
                    response = _d.sent();
                    alert("Signup successful. Please login to continue.");
                    navigate("/login");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    console.error("Signup error:", ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) || error_1.message);
                    alert(((_c = (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || "Signup failed");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen flex">
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
          <framer_motion_1.motion.div key="signup" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }} className="max-w-md w-full">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 text-center">Create your account</h2>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Get started with the platform
                </p>
              </div>
    
              <div className="space-y-5">
                <input type="text" placeholder="Full Name" value={name} onChange={function (e) { return setName(e.target.value); }} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"/>
                <input type="text" placeholder="Employee ID" value={employeeId} onChange={function (e) { return setEmployeeId(e.target.value.toUpperCase()); }} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"/>
                <input type="email" placeholder="Email" value={email} onChange={function (e) { return setEmail(e.target.value); }} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"/>
                <input type="password" placeholder="Password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition"/>
                <button onClick={handleSignup} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow-md transition">
                  Sign Up
                </button>
              </div>
    
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button onClick={function () { return navigate("/login"); }} className="text-green-600 hover:underline font-medium">
                  Log In
                </button>
              </div>
            </div>
          </framer_motion_1.motion.div>
        </div>
      </div>);
}
