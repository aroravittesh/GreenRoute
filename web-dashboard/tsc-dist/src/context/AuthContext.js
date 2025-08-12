"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthProvider = void 0;
var react_1 = require("react");
var AuthContext = (0, react_1.createContext)(undefined);
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(function () { return localStorage.getItem("token"); }), token = _b[0], setToken = _b[1];
    var _c = (0, react_1.useState)(function () {
        var stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    }), user = _c[0], setUser = _c[1];
    var login = function (newToken, userData) {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    var logout = function () {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    return (<AuthContext.Provider value={{ token: token, user: user, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>);
};
exports.AuthProvider = AuthProvider;
var useAuth = function () {
    var ctx = (0, react_1.useContext)(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
exports.useAuth = useAuth;
