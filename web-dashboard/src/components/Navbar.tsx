// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { token, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleProtectedNav = (path: string) => {
//     if (token) {
//       navigate(path);
//     } else {
//       navigate("/redirect");
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-extrabold tracking-tight text-green-600 hover:text-green-700 transition"
//         >
//           GreenRoute
//         </Link>

//         {/* Mobile toggle */}
//         <button
//           className="md:hidden text-gray-700 focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             {isOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>

//         {/* Nav Items */}
//         <div
//           className={`${
//             isOpen ? "block" : "hidden"
//           } md:flex md:items-center md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0`}
//         >
//           <button
//             onClick={() => handleProtectedNav("/")}
//             className="text-gray-700 hover:text-green-600 font-medium transition"
//           >
//             Dashboard
//           </button>
//           <button
//             onClick={() => handleProtectedNav("/model-a")}
//             className="text-gray-700 hover:text-green-600 font-medium transition"
//           >
//             Demand Forecast
//           </button>
//           <button
//             onClick={() => handleProtectedNav("/model-b")}
//             className="text-gray-700 hover:text-green-600 font-medium transition"
//           >
//             Spoilage Sim
//           </button>
//           <button
//             onClick={() => handleProtectedNav("/model-c")}
//             className="text-gray-700 hover:text-green-600 font-medium transition"
//           >
//             Smart Routing
//           </button>

//           {token ? (
//             <button
//               onClick={() => navigate("/redirect", { state: { from: "logout" } })}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleProtectedNav = (path: string) => {
    if (token) {
      navigate(path);
    } else {
      navigate("/redirect");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9fa] shadow-md border-b border-gray-300 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 tracking-tight hover:opacity-90 transition"
        >
          Sanchaya
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0 text-sm font-medium`}
        >
          <button
            onClick={() => handleProtectedNav("/")}
            className="relative group text-gray-700 hover:text-green-600 transition"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-green-600 transition-all duration-300"></span>
          </button>

          <button
            onClick={() => handleProtectedNav("/model-a")}
            className="relative group text-gray-700 hover:text-green-600 transition"
          >
            Demand Forecast
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-green-600 transition-all duration-300"></span>
          </button>

          <button
            onClick={() => handleProtectedNav("/model-b")}
            className="relative group text-gray-700 hover:text-green-600 transition"
          >
            Spoilage Forecast
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-green-600 transition-all duration-300"></span>
          </button>

          <button
            onClick={() => handleProtectedNav("/model-c")}
            className="relative group text-gray-700 hover:text-green-600 transition"
          >
            Smart Routing
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-green-600 transition-all duration-300"></span>
          </button>

          {token ? (
            <button
            onClick={() => navigate("/redirect", { state: { from: "logout" } })}
            className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition-all duration-200 shadow-sm"
          >
            Logout
          </button>
          
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
