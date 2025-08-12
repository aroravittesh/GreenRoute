"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RedirectWithMessage;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Navbar_1 = require("../components/Navbar");
var AuthContext_1 = require("../context/AuthContext");
var framer_motion_1 = require("framer-motion");
function RedirectWithMessage() {
    var _a;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    var logout = (0, AuthContext_1.useAuth)().logout;
    var isLogout = ((_a = location.state) === null || _a === void 0 ? void 0 : _a.from) === "logout";
    (0, react_1.useEffect)(function () {
        if (isLogout)
            logout();
        var timer = setTimeout(function () {
            navigate("/login");
        }, 2000);
        return function () { return clearTimeout(timer); };
    }, [navigate, logout, isLogout]);
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      <framer_motion_1.motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }} style={{ padding: "2rem" }}>
      <Navbar_1.default />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-md rounded-xl p-8 text-center space-y-4 max-w-md w-full">
          {isLogout ? (<>
              <h2 className="text-2xl font-semibold text-gray-800">Logging out...</h2>
              <p className="text-gray-500 text-sm">Redirecting to login shortly.</p>
            </>) : (<>
              <h2 className="text-2xl font-semibold text-gray-800">Login Required</h2>
              <p className="text-gray-500">You must be logged in to access this page.</p>
              <p className="text-sm text-gray-400">Redirecting to login...</p>
            </>)}
        </div>
      </div>
      </framer_motion_1.motion.div>
    </div>);
}
