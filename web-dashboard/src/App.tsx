// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import ModelA from "./pages/ModelA";
// import ModelB from "./pages/ModelB";
// import ModelC from "./pages/ModelC";
// import { AuthProvider, useAuth } from "./context/AuthContext";

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
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ModelA from "./pages/ModelA";
import ModelB from "./pages/ModelB";
import ModelC from "./pages/ModelC";
import RedirectWithMessage from "./pages/RedirectWithMessage";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/redirect" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/redirect" element={<RedirectWithMessage />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/model-a" element={<ProtectedRoute><ModelA /></ProtectedRoute>} />
          <Route path="/model-b" element={<ProtectedRoute><ModelB /></ProtectedRoute>} />
          <Route path="/model-c" element={<ProtectedRoute><ModelC /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}