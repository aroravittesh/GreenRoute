"use strict";
// import React, { useState, useEffect } from "react";
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
exports.default = ModelA;
// export default function ModelA() {
//   const [storeId, setStoreId] = useState("122");
//   const [productId, setProductId] = useState("267");
//   const [isLoading, setIsLoading] = useState(false);
//   const [metrics, setMetrics] = useState<{ mae: string; mape: string }>({ mae: "", mape: "" });
//   const [csvData, setCsvData] = useState<string[][]>([]);
//   const [imageUrl, setImageUrl] = useState("");
//   const handleRunModel = async () => {
//     setIsLoading(true);
//     try {
//       await fetch(
//         `http://54.197.3.23:5786/api/model-a/run?store_id=${storeId}&product_id=${productId}`
//       );
//       await fetchOutputs();
//     } catch (err) {
//       alert("❌ Failed to run model");
//     }
//     setIsLoading(false);
//   };
//   const fetchOutputs = async () => {
//     try {
//       const metricsRes = await fetch("http://54.197.3.23:5786/api/model-a/metrics");
//       const metricsData = await metricsRes.json();
//       setMetrics({
//         mae: parseFloat(metricsData.mae).toFixed(2),
//         mape: parseFloat(metricsData.mape).toFixed(2) + "%",
//       });
//       const csvRes = await fetch("http://54.197.3.23:5786/api/model-a/predictions");
//       const text = await csvRes.text();
//       const rows = text.trim().split("\n").map((line) => line.split(","));
//       setCsvData(rows);
//       setImageUrl(`http://54.197.3.23:5786/api/model-a/image?${Date.now()}`); // cache bust
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     fetchOutputs(); // Load latest data on mount
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <main className="pt-24 px-6 max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Demand Forecasting – Model A</h1>
//         {/* Store/Product Input */}
//         <div className="mb-6 flex items-center gap-4 flex-wrap">
//           <input
//             type="number"
//             value={storeId}
//             onChange={(e) => setStoreId(e.target.value)}
//             placeholder="Store ID"
//             className="border border-gray-300 rounded px-4 py-2 w-32"
//           />
//           <input
//             type="number"
//             value={productId}
//             onChange={(e) => setProductId(e.target.value)}
//             placeholder="Product ID"
//             className="border border-gray-300 rounded px-4 py-2 w-32"
//           />
//           <button
//             onClick={handleRunModel}
//             disabled={isLoading}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             {isLoading ? "Running..." : "Run Model"}
//           </button>
//         </div>
//         {/* Accuracy Metrics */}
//         <div className="bg-white shadow rounded p-4 mb-6">
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">📊 Accuracy Metrics</h2>
//           <p>MAE: <strong>{metrics.mae}</strong></p>
//           <p>MAPE: <strong>{metrics.mape}</strong></p>
//         </div>
//         {/* Forecast Plot */}
//         {imageUrl && (
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">📉 Forecast Plot</h2>
//             <img
//               src={imageUrl}
//               alt="Forecast Plot"
//               className="rounded border shadow max-w-full"
//             />
//           </div>
//         )}
//         {/* Predictions Table */}
//         {csvData.length > 0 && (
//           <div className="overflow-x-auto">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">📁 Forecast Table</h2>
//             <table className="min-w-full text-sm border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   {csvData[0].map((col, i) => (
//                     <th key={i} className="text-left px-4 py-2 border">{col}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {csvData.slice(1).map((row, i) => (
//                   <tr key={i} className="border-t">
//                     {row.map((cell, j) => (
//                       <td key={j} className="px-4 py-2 border">{cell}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import Navbar from "../components/Navbar";
// export default function ModelA() {
//   const [productId, setProductId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [csvData, setCsvData] = useState([]);
//   const runModel = async () => {
//     if (!productId.trim()) {
//       alert("Please enter a product ID.");
//       return;
//     }
//     setLoading(true);
//     setImageUrl("");
//     setCsvData([]);
//     try {
//       await axios.get(`http://54.197.3.23:5786/api/model-a/run`, {
//         params: { product_id: productId },
//       });
//       // Load plot
//       setImageUrl("http://54.197.3.23:5786/api/model-a/forecast/image");
//       // Fetch CSV
//       const res = await axios.get("http://54.197.3.23:5786/api/model-a/forecast/data");
//       const parsed = Papa.parse(res.data, { header: true });
//       setCsvData(parsed.data);
//     } catch (error) {
//       alert("Model run failed. Check logs.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-50 px-6 pt-24">
//       <Navbar />
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Top 5 Store Forecast - Model A</h1>
//       <div className="flex items-center gap-4 mb-6">
//         <label className="font-medium text-gray-700">Product ID:</label>
//         <input
//           type="number"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           className="border rounded px-4 py-2 w-32"
//           placeholder="e.g. 267"
//         />
//         <button
//           onClick={runModel}
//           className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
//         >
//           Run Forecast
//         </button>
//       </div>
//       {loading && <p className="text-gray-600">⏳ Running model... Please wait.</p>}
//       {imageUrl && (
//         <div className="mt-6">
//           <img src={imageUrl} alt="Forecast Plot" className="rounded shadow-md max-w-full" />
//           <a
//             href="http://54.197.3.23:5786/api/model-a/forecast/data"
//             download
//             className="inline-block mt-4 text-green-700 hover:underline"
//           >
//             📥 Download Forecast CSV
//           </a>
//         </div>
//       )}
//       {csvData.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">📊 Forecast Table</h2>
//           <div className="overflow-x-auto border rounded-md shadow-sm">
//             <table className="min-w-full table-auto text-sm text-left">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   {Object.keys(csvData[0]).map((key) => (
//                     <th key={key} className="px-4 py-2 border-b">
//                       {key}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {csvData.map((row, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50">
//                     {Object.values(row).map((val, i) => (
//                       <td key={i} className="px-4 py-2 border-b whitespace-nowrap">
//                         {val}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// /src/pages/ModelA.tsx
// import { useState } from "react";
// import axios from "axios";
// export default function ModelA() {
//   const [productId, setProductId] = useState("");
//   const [chartUrl, setChartUrl] = useState("");
//   const [csvData, setCsvData] = useState<string[][]>([]);
//   const runForecast = async () => {
//     try {
//       await axios.get(`http://54.197.3.23:5786/api/model-a/run?product_id=${productId}`);
//       setChartUrl(`http://54.197.3.23:5786/api/model-a/chart?ts=${Date.now()}`);
//       const csv = await axios.get(`http://54.197.3.23:5786/api/model-a/data`);
//       const parsed = csv.data.split("\n").map((row: string) => row.split(","));
//       setCsvData(parsed);
//     } catch (err) {
//       alert("Error running forecast.");
//     }
//   };
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">📊 30-Day Forecast - Bar Chart</h2>
//       <input
//         value={productId}
//         onChange={(e) => setProductId(e.target.value)}
//         className="border px-3 py-2 mr-3"
//         placeholder="Enter Product ID"
//       />
//       <button onClick={runForecast} className="bg-green-600 text-white px-4 py-2 rounded">
//         Run Forecast
//       </button>
//       {chartUrl && (
//         <div className="mt-6">
//           <img src={chartUrl} alt="Forecast Chart" className="w-full max-w-xl" />
//         </div>
//       )}
//       {csvData.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">📄 Forecast Table</h3>
//           <table className="table-auto border">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Store ID</th>
//                 <th className="border px-4 py-2">Forecasted Units</th>
//               </tr>
//             </thead>
//             <tbody>
//               {csvData.slice(1).map((row, idx) => (
//                 <tr key={idx}>
//                   <td className="border px-4 py-2">{row[0]}</td>
//                   <td className="border px-4 py-2">{row[1]}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
var react_1 = require("react");
var axios_1 = require("axios");
var Navbar_1 = require("../components/Navbar");
var framer_motion_1 = require("framer-motion");
function ModelA() {
    var _this = this;
    var _a = (0, react_1.useState)(""), productId = _a[0], setProductId = _a[1];
    var _b = (0, react_1.useState)(null), chartUrl = _b[0], setChartUrl = _b[1];
    var _c = (0, react_1.useState)([]), csvData = _c[0], setCsvData = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    // Load last state from localStorage
    (0, react_1.useEffect)(function () {
        var lastChart = localStorage.getItem("modelA_chartUrl");
        var lastCsv = localStorage.getItem("modelA_csvData");
        if (lastChart)
            setChartUrl(lastChart);
        if (lastCsv)
            setCsvData(JSON.parse(lastCsv));
    }, []);
    var runForecast = function () { return __awaiter(_this, void 0, void 0, function () {
        var chart, csv, parsed, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!productId.trim())
                        return [2 /*return*/, alert("Please enter a product ID.")];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, axios_1.default.get("http://54.197.3.23:5786/api/model-a/run?product_id=".concat(productId))];
                case 2:
                    _a.sent();
                    chart = "http://54.197.3.23:5786/api/model-a/chart?ts=".concat(Date.now());
                    return [4 /*yield*/, axios_1.default.get("http://54.197.3.23:5786/api/model-a/data")];
                case 3:
                    csv = _a.sent();
                    parsed = csv.data.split("\n").map(function (row) { return row.split(","); });
                    setChartUrl(chart);
                    setCsvData(parsed);
                    localStorage.setItem("modelA_chartUrl", chart);
                    localStorage.setItem("modelA_csvData", JSON.stringify(parsed));
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    alert("Error running forecast.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen" style={{ backgroundColor: "#f1f8e9" }}>
      <Navbar_1.default />
      <framer_motion_1.motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }} style={{ padding: "2rem" }}>
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Product Sales Forecast</h1>
          <p className="text-gray-600 mt-1">
            Forecasted unit sales for the next 30 days across top stores.
          </p>
        </div>

        {/* Input Form */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <input type="text" value={productId} onChange={function (e) { return setProductId(e.target.value); }} placeholder="Enter Product ID (e.g., 267)" className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"/>
          <button onClick={runForecast} className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition">
            {loading ? "Running..." : "Run Forecast"}
          </button>
        </div>

        {/* Chart Section */}
        {chartUrl && (<div className="mb-12">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Forecasted Sales (Bar Chart)
            </h2>
            <div className="bg-white border rounded-lg shadow p-4">
              <img src={chartUrl} alt="Forecast Chart" className="w-full max-h-[480px] object-contain rounded" style={{ border: "1px solid #e0e0e0" }}/>
            </div>
          </div>)}

        {/* Table Section */}
        {csvData.length > 0 && (<div className="mb-16">
            <h2 className="text-xl font-medium text-gray-800 mb-3">Forecast Data Table</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow border">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-100 text-gray-600 font-medium">
                  <tr>
                    <th className="px-6 py-3 text-left">Store ID</th>
                    <th className="px-6 py-3 text-left">Forecasted Units (30 Days)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {csvData.slice(1).filter(function (row) { return !isNaN(parseFloat(row[1])); }).map(function (row, idx) { return (<tr key={idx} className="border-t">
                      <td className="px-6 py-3">{row[0]}</td>
                      <td className="px-6 py-3">{parseFloat(row[1]).toFixed(2)}</td>
                    </tr>); })}
                </tbody>
              </table>
            </div>
          </div>)}
      </main>
      </framer_motion_1.motion.div>
    </div>);
}
