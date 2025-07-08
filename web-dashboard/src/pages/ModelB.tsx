// import { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";

// export default function SpoilageForecast() {
//   const [chartUrl, setChartUrl] = useState("");
//   const [csvData, setCsvData] = useState<string[][]>([]);
//   const [loading, setLoading] = useState(false);

//   const runSimulation = async () => {
//     setLoading(true);
//     try {
//       await axios.get("http://localhost:5786/api/model-b/run");
//       setChartUrl(`http://localhost:5786/api/model-b/image?ts=${Date.now()}`);
//       const csv = await axios.get("http://localhost:5786/api/model-b/predictions");
//       const parsed = csv.data.split("\n").map((row: string) => row.split(","));
//       setCsvData(parsed);
//     } catch (err) {
//       alert("Failed to run simulation");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#f1f8e9" }}>
//       <Navbar />
//       <motion.div
//       key="home"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{ duration: 0.5 }}
//       style={{ padding: "2rem" }}
//     >
//       <main className="pt-24 px-6 max-w-7xl mx-auto">
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Spoilage Forecast (Model B)</h1>
//           <p className="text-gray-600 mb-4">Forecast vs Actual Sales for 30 Days</p>
//           <button
//             onClick={runSimulation}
//             className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
//           >
//             {loading ? "Running..." : "Run Forecast"}
//           </button>
//         </div>

//         {chartUrl && (
//           <div className="mb-10">
//             <h2 className="text-xl font-medium text-gray-800 mb-3">Forecast Chart</h2>
//             <div className="bg-white border rounded-lg shadow p-4">
//               <img
//                 src={chartUrl}
//                 alt="Spoilage Forecast"
//                 className="w-full max-h-[480px] object-contain rounded"
//                 style={{ border: "1px solid #e0e0e0" }}
//               />
//             </div>
//           </div>
//         )}

//         {csvData.length > 1 && (
//           <div className="mb-16">
//             <h2 className="text-xl font-medium text-gray-800 mb-3">Prediction Table</h2>
//             <div className="overflow-x-auto bg-white rounded-lg shadow border">
//               <table className="min-w-full table-auto text-sm">
//                 <thead className="bg-gray-100 text-gray-600 font-medium">
//                   <tr>
//                     {csvData[0].map((header, idx) => (
//                       <th key={idx} className="px-6 py-3 text-left">{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-700">
//                   {csvData.slice(1).filter(row => !isNaN(parseFloat(row[1]))).map((row, idx) => (
//                     <tr key={idx} className="border-t">
//                       {row.map((cell, i) => (
//                         <td key={i} className="px-6 py-3">{cell}</td>
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
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function SpoilageForecast() {
  const [chartUrl, setChartUrl] = useState("");
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  // Load saved chart and data from localStorage on mount
  useEffect(() => {
    const savedChartUrl = localStorage.getItem("chartUrl");
    const savedCsvData = localStorage.getItem("csvData");

    if (savedChartUrl) setChartUrl(savedChartUrl);
    if (savedCsvData) setCsvData(JSON.parse(savedCsvData));
  }, []);

  const runSimulation = async () => {
    setLoading(true);
    try {
      await axios.get("http://localhost:5786/api/model-b/run");

      const imageUrl = `http://localhost:5786/api/model-b/image?ts=${Date.now()}`;
      setChartUrl(imageUrl);
      localStorage.setItem("chartUrl", imageUrl);

      const csv = await axios.get("http://localhost:5786/api/model-b/predictions");
      const parsed = csv.data
        .split("\n")
        .map((row: string) => row.split(","))
        .filter(row => row.length >= 2); // Remove malformed lines
      setCsvData(parsed);
      localStorage.setItem("csvData", JSON.stringify(parsed));
    } catch (err) {
      alert("Failed to run simulation");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f1f8e9" }}>
      <Navbar />
      <motion.div
        key="home"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        style={{ padding: "2rem" }}
      >
        <main className="pt-24 px-6 max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Spoilage Forecast (Model B)</h1>
            <p className="text-gray-600 mb-4">Forecast vs Actual Sales for 30 Days</p>
            <button
              onClick={runSimulation}
              className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
            >
              {loading ? "Running..." : "Run Forecast"}
            </button>
          </div>

          {chartUrl && (
            <div className="mb-10">
              <h2 className="text-xl font-medium text-gray-800 mb-3">Forecast Chart</h2>
              <div className="bg-white border rounded-lg shadow p-4">
                <img
                  src={chartUrl}
                  alt="Spoilage Forecast"
                  className="w-full max-h-[480px] object-contain rounded"
                  style={{ border: "1px solid #e0e0e0" }}
                />
              </div>
            </div>
          )}

          {csvData.length > 1 && (
            <div className="mb-16">
              <h2 className="text-xl font-medium text-gray-800 mb-3">Prediction Table</h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow border">
                <table className="min-w-full table-auto text-sm">
                  <thead className="bg-gray-100 text-gray-600 font-medium">
                    <tr>
                      {csvData[0].map((header, idx) => (
                        <th key={idx} className="px-6 py-3 text-left">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {csvData
                      .slice(1)
                      .filter(row => row.length >= 2 && !isNaN(parseFloat(row[1])))
                      .map((row, idx) => (
                        <tr key={idx} className="border-t">
                          {row.map((cell, i) => (
                            <td key={i} className="px-6 py-3">{cell}</td>
                          ))}
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </motion.div>
    </div>
  );
}
