"use strict";
// import { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";
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
exports.default = DistributionPlanner;
// export default function DistributionPlanner() {
//   const [chartUrl, setChartUrl] = useState("");
//   const [csvData, setCsvData] = useState<string[][]>([]);
//   const [loading, setLoading] = useState(false);
//   const [metrics, setMetrics] = useState<{ mae: string; mape: string } | null>(
//     null
//   );
//   const runOptimizer = async () => {
//     setLoading(true);
//     try {
//       // Run backend optimization
//       const result = await axios.get("https://sanchaya.live/api/model-c/run");
//       // Update metrics
//       setMetrics({
//         mae: result.data.mae.toFixed(2),
//         mape: result.data.mape.toFixed(2),
//       });
//       // Update chart
//       setChartUrl(`https://sanchaya.live/api/model-c/image?ts=${Date.now()}`);
//       // Get CSV results
//       const csv = await axios.get(
//         "https://sanchaya.live/api/model-c/predictions"
//       );
//       const parsed = csv.data.split("\n").map((row: string) => row.split(","));
//       setCsvData(parsed);
//     } catch (err) {
//       alert("Failed to run optimizer.");
//     }
//     setLoading(false);
//   };
//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#fffde7" }}>
//       <Navbar />
//       <motion.div
//       key="home"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{ duration: 1 }}
//       style={{ padding: "2rem" }}
//     >
//       <main className="pt-24 px-6 max-w-7xl mx-auto">
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Smart Distribution Planner (Model C)
//           </h1>
//           <p className="text-gray-600 mb-4">
//             Distribute inventory across stores using forecasted demand.
//           </p>
//           <button
//             onClick={runOptimizer}
//             className="bg-yellow-700 text-white px-6 py-2 rounded-md hover:bg-yellow-800 transition"
//           >
//             {loading ? "Optimizing..." : "Run Distribution"}
//           </button>
//         </div>
//         {metrics && (
//           <div className="mb-6 text-gray-700">
//             <p className="text-lg font-medium">📊 Distribution Accuracy:</p>
//             <p>MAE: {metrics.mae}</p>
//             <p>MAPE: {metrics.mape}%</p>
//           </div>
//         )}
//         {chartUrl && (
//           <div className="mb-10">
//             <h2 className="text-xl font-medium text-gray-800 mb-3">
//               Distribution Overview
//             </h2>
//             <div className="bg-white border rounded-lg shadow p-4">
//               <img
//                 src={chartUrl}
//                 alt="Distribution Forecast Chart"
//                 className="w-full max-h-[480px] object-contain rounded"
//                 style={{ border: "1px solid #e0e0e0" }}
//               />
//             </div>
//           </div>
//         )}
//         {csvData.length > 1 && (
//           <div className="mb-16">
//             <h2 className="text-xl font-medium text-gray-800 mb-3">
//               Distribution Table
//             </h2>
//             <div className="overflow-x-auto bg-white rounded-lg shadow border">
//               <table className="min-w-full table-auto text-sm">
//                 <thead className="bg-gray-100 text-gray-600 font-medium">
//                   <tr>
//                     {csvData[0].map((header, idx) => (
//                       <th key={idx} className="px-6 py-3 text-left">
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-700">
//                   {csvData.slice(1).filter(row => !isNaN(parseFloat(row[1]))).map((row, idx) => (
//                     <tr key={idx} className="border-t">
//                       {row.map((cell, i) => (
//                         <td key={i} className="px-6 py-3">
//                           {cell}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>
//       </motion.div>
//     </div>
//   );
// }
var react_1 = require("react");
var axios_1 = require("axios");
var Navbar_1 = require("../components/Navbar");
var framer_motion_1 = require("framer-motion");
function DistributionPlanner() {
    var _this = this;
    var _a = (0, react_1.useState)(""), chartUrl = _a[0], setChartUrl = _a[1];
    var _b = (0, react_1.useState)([]), csvData = _b[0], setCsvData = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var STORAGE_KEY_CSV = "model-c-csv";
    var STORAGE_KEY_TIMESTAMP = "model-c-timestamp";
    // 🔄 Load data from localStorage on first load
    (0, react_1.useEffect)(function () {
        var savedCsv = localStorage.getItem(STORAGE_KEY_CSV);
        var savedTimestamp = localStorage.getItem(STORAGE_KEY_TIMESTAMP);
        if (savedCsv && savedTimestamp) {
            var parsedCsv = savedCsv
                .split("\n")
                .map(function (row) { return row.split(","); });
            setCsvData(parsedCsv);
            setChartUrl("https://sanchaya.live/api/model-c/image?ts=".concat(savedTimestamp));
        }
    }, []);
    var runOptimizer = function () { return __awaiter(_this, void 0, void 0, function () {
        var timestamp, csv, parsed, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("https://sanchaya.live/api/model-c/run")];
                case 2:
                    _a.sent();
                    timestamp = Date.now();
                    setChartUrl("https://sanchaya.live/api/model-c/image?ts=".concat(timestamp));
                    localStorage.setItem(STORAGE_KEY_TIMESTAMP, timestamp.toString());
                    return [4 /*yield*/, axios_1.default.get("https://sanchaya.live/api/model-c/predictions")];
                case 3:
                    csv = _a.sent();
                    parsed = csv.data.trim().split("\n").map(function (row) { return row.split(","); });
                    setCsvData(parsed);
                    localStorage.setItem(STORAGE_KEY_CSV, csv.data.trim());
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    alert("Failed to run distribution optimizer.");
                    console.error(err_1);
                    return [3 /*break*/, 5];
                case 5:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen" style={{ backgroundColor: "#f1f8e9" }}>
      <Navbar_1.default />
      <framer_motion_1.motion.div key="distribution" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }} className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Smart Distribution Planner
          </h1>
          <p className="text-gray-600 mb-4">
            Allocate limited stock across top stores based on forecasted demand.
          </p>
          <button onClick={runOptimizer} className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition">
            {loading ? "Optimizing..." : "Run Distribution"}
          </button>
        </div>

        {chartUrl && (<div className="mb-10">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Distribution Chart
            </h2>
            <div className="bg-white border rounded-lg shadow p-4">
              <img src={chartUrl} alt="Distribution Plan Chart" className="w-full max-h-[480px] object-contain rounded" style={{ border: "1px solid #e0e0e0" }}/>
            </div>
          </div>)}

        {csvData.length > 1 && (<div className="mb-16">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Distribution Table
            </h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow border">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-100 text-gray-600 font-medium">
                  <tr>
                    {csvData[0].map(function (header, idx) { return (<th key={idx} className="px-6 py-3 text-left">
                        {header}
                      </th>); })}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {csvData.slice(1).map(function (row, idx) { return (<tr key={idx} className="border-t">
                      {row.map(function (cell, i) { return (<td key={i} className="px-6 py-3">
                          {cell}
                        </td>); })}
                    </tr>); })}
                </tbody>
              </table>
            </div>
          </div>)}
      </framer_motion_1.motion.div>
    </div>);
}
