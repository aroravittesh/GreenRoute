// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";

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
//         `http://localhost:5786/api/model-a/run?store_id=${storeId}&product_id=${productId}`
//       );
//       await fetchOutputs();
//     } catch (err) {
//       alert("❌ Failed to run model");
//     }
//     setIsLoading(false);
//   };

//   const fetchOutputs = async () => {
//     try {
//       const metricsRes = await fetch("http://localhost:5786/api/model-a/metrics");
//       const metricsData = await metricsRes.json();
//       setMetrics({
//         mae: parseFloat(metricsData.mae).toFixed(2),
//         mape: parseFloat(metricsData.mape).toFixed(2) + "%",
//       });

//       const csvRes = await fetch("http://localhost:5786/api/model-a/predictions");
//       const text = await csvRes.text();
//       const rows = text.trim().split("\n").map((line) => line.split(","));
//       setCsvData(rows);

//       setImageUrl(`http://localhost:5786/api/model-a/image?${Date.now()}`); // cache bust
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
//       await axios.get(`http://localhost:5786/api/model-a/run`, {
//         params: { product_id: productId },
//       });

//       // Load plot
//       setImageUrl("http://localhost:5786/api/model-a/forecast/image");

//       // Fetch CSV
//       const res = await axios.get("http://localhost:5786/api/model-a/forecast/data");
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
//             href="http://localhost:5786/api/model-a/forecast/data"
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
//       await axios.get(`http://localhost:5786/api/model-a/run?product_id=${productId}`);
//       setChartUrl(`http://localhost:5786/api/model-a/chart?ts=${Date.now()}`);
//       const csv = await axios.get(`http://localhost:5786/api/model-a/data`);
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
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ModelA() {
  const [productId, setProductId] = useState("");
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  // Load last state from localStorage
  useEffect(() => {
    const lastChart = localStorage.getItem("modelA_chartUrl");
    const lastCsv = localStorage.getItem("modelA_csvData");
    if (lastChart) setChartUrl(lastChart);
    if (lastCsv) setCsvData(JSON.parse(lastCsv));
  }, []);

  const runForecast = async () => {
    if (!productId.trim()) return alert("Please enter a product ID.");
    setLoading(true);
    try {
      await axios.get(`http://localhost:5786/api/model-a/run?product_id=${productId}`);

      const chart = `http://localhost:5786/api/model-a/chart?ts=${Date.now()}`;
      const csv = await axios.get(`http://localhost:5786/api/model-a/data`);
      const parsed = csv.data.split("\n").map((row: string) => row.split(","));

      setChartUrl(chart);
      setCsvData(parsed);

      localStorage.setItem("modelA_chartUrl", chart);
      localStorage.setItem("modelA_csvData", JSON.stringify(parsed));
    } catch (err) {
      alert("Error running forecast.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f1f8e9" }}>
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Product Sales Forecast</h1>
          <p className="text-gray-600 mt-1">
            Forecasted unit sales for the next 30 days across top stores.
          </p>
        </div>

        {/* Input Form */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID (e.g., 267)"
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
          <button
            onClick={runForecast}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            {loading ? "Running..." : "Run Forecast"}
          </button>
        </div>

        {/* Chart Section */}
        {chartUrl && (
          <div className="mb-12">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Forecasted Sales (Bar Chart)
            </h2>
            <div className="bg-white border rounded-lg shadow p-4">
              <img
                src={chartUrl}
                alt="Forecast Chart"
                className="w-full max-h-[480px] object-contain rounded"
                style={{ border: "1px solid #e0e0e0" }}
              />
            </div>
          </div>
        )}

        {/* Table Section */}
        {csvData.length > 0 && (
          <div className="mb-16">
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
                  {csvData.slice(1).map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-6 py-3">{row[0]}</td>
                      <td className="px-6 py-3">{parseFloat(row[1]).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
