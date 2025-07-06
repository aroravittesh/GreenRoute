import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function DistributionPlanner() {
  const [chartUrl, setChartUrl] = useState("");
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<{ mae: string; mape: string } | null>(
    null
  );

  const runOptimizer = async () => {
    setLoading(true);
    try {
      // Run backend optimization
      const result = await axios.get("http://localhost:5786/api/model-c/run");

      // Update metrics
      setMetrics({
        mae: result.data.mae.toFixed(2),
        mape: result.data.mape.toFixed(2),
      });

      // Update chart
      setChartUrl(`http://localhost:5786/api/model-c/image?ts=${Date.now()}`);

      // Get CSV results
      const csv = await axios.get(
        "http://localhost:5786/api/model-c/predictions"
      );
      const parsed = csv.data.split("\n").map((row: string) => row.split(","));
      setCsvData(parsed);
    } catch (err) {
      alert("Failed to run optimizer.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffde7" }}>
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Smart Distribution Planner (Model C)
          </h1>
          <p className="text-gray-600 mb-4">
            Distribute inventory across stores using forecasted demand.
          </p>
          <button
            onClick={runOptimizer}
            className="bg-yellow-700 text-white px-6 py-2 rounded-md hover:bg-yellow-800 transition"
          >
            {loading ? "Optimizing..." : "Run Distribution"}
          </button>
        </div>

        {metrics && (
          <div className="mb-6 text-gray-700">
            <p className="text-lg font-medium">📊 Distribution Accuracy:</p>
            <p>MAE: {metrics.mae}</p>
            <p>MAPE: {metrics.mape}%</p>
          </div>
        )}

        {chartUrl && (
          <div className="mb-10">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Distribution Overview
            </h2>
            <div className="bg-white border rounded-lg shadow p-4">
              <img
                src={chartUrl}
                alt="Distribution Forecast Chart"
                className="w-full max-h-[480px] object-contain rounded"
                style={{ border: "1px solid #e0e0e0" }}
              />
            </div>
          </div>
        )}

        {csvData.length > 1 && (
          <div className="mb-16">
            <h2 className="text-xl font-medium text-gray-800 mb-3">
              Distribution Table
            </h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow border">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-100 text-gray-600 font-medium">
                  <tr>
                    {csvData[0].map((header, idx) => (
                      <th key={idx} className="px-6 py-3 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {csvData.slice(1).map((row, idx) => (
                    <tr key={idx} className="border-t">
                      {row.map((cell, i) => (
                        <td key={i} className="px-6 py-3">
                          {cell}
                        </td>
                      ))}
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
