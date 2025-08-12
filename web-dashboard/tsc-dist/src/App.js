"use strict";
// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import ModelA from "./pages/ModelA";
// import ModelB from "./pages/ModelB";
// import ModelC from "./pages/ModelC";
// import { AuthProvider, useAuth } from "./context/AuthContext";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
// // ProtectedRoute with delay and message
// function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { token } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!token) {
//       const timeout = setTimeout(() => {
//         navigate("/login", { state: { from: location.pathname } });
//       }, 2000);
//       return () => clearTimeout(timeout);
//     }
//   }, [token, navigate, location]);
//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center px-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Login Required</h2>
//           <p className="text-gray-600 mt-2">You must be logged in to access this page.</p>
//           <p className="text-sm text-gray-400 mt-1">Redirecting to login...</p>
//         </div>
//       </div>
//     );
//   }
//   return children;
// }
// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//           <Route path="/model-a" element={<ProtectedRoute><ModelA /></ProtectedRoute>} />
//           <Route path="/model-b" element={<ProtectedRoute><ModelB /></ProtectedRoute>} />
//           <Route path="/model-c" element={<ProtectedRoute><ModelC /></ProtectedRoute>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }
// src/App.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Login_1 = require("./pages/Login");
var Signup_1 = require("./pages/Signup");
var Home_1 = require("./pages/Home");
var ModelA_1 = require("./pages/ModelA");
var ModelB_1 = require("./pages/ModelB");
var ModelC_1 = require("./pages/ModelC");
var RedirectWithMessage_1 = require("./pages/RedirectWithMessage");
var AuthContext_1 = require("./context/AuthContext");
function ProtectedRoute(_a) {
    var children = _a.children;
    var token = (0, AuthContext_1.useAuth)().token;
    return token ? children : <react_router_dom_1.Navigate to="/redirect"/>;
}
function App() {
    return (<AuthContext_1.AuthProvider>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
          <react_router_dom_1.Route path="/signup" element={<Signup_1.default />}/>
          <react_router_dom_1.Route path="/redirect" element={<RedirectWithMessage_1.default />}/>
          <react_router_dom_1.Route path="/" element={<ProtectedRoute><Home_1.default /></ProtectedRoute>}/>
          <react_router_dom_1.Route path="/model-a" element={<ProtectedRoute><ModelA_1.default /></ProtectedRoute>}/>
          <react_router_dom_1.Route path="/model-b" element={<ProtectedRoute><ModelB_1.default /></ProtectedRoute>}/>
          <react_router_dom_1.Route path="/model-c" element={<ProtectedRoute><ModelC_1.default /></ProtectedRoute>}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </AuthContext_1.AuthProvider>);
}
