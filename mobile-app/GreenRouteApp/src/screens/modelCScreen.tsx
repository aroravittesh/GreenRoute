import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModelCScreen() {
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [metrics, setMetrics] = useState<{ mae: string; mape: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://13.218.87.21:5786"; // ✅ Update to your IP

  useEffect(() => {
    const loadStored = async () => {
      try {
        const savedChart = await AsyncStorage.getItem("modelC_chart");
        const savedCsv = await AsyncStorage.getItem("modelC_csv");
        const savedMetrics = await AsyncStorage.getItem("modelC_metrics");

        if (savedChart) setChartUrl(savedChart);
        if (savedCsv) setCsvData(JSON.parse(savedCsv));
        if (savedMetrics) setMetrics(JSON.parse(savedMetrics));
      } catch (err) {
        console.error("⚠️ Load error:", err);
      }
    };
    loadStored();
  }, []);

  const runDistribution = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BASE_URL}/api/model-c/run`);
      const chart = `${BASE_URL}/api/model-c/image?ts=${Date.now()}`;
      const csv = await axios.get(`${BASE_URL}/api/model-c/predictions`);
      const parsedCsv = csv.data.split("\n").map((row: string) => row.split(","));

      setChartUrl(chart);
      setCsvData(parsedCsv);

      await AsyncStorage.setItem("modelC_chart", chart);
      await AsyncStorage.setItem("modelC_csv", JSON.stringify(parsedCsv));
    } catch (err) {
      alert("Failed to run distribution planner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-lime-50 px-4 pt-16">
      <Text className="text-2xl font-bold text-gray-800 mb-2">Distribution Planner</Text>
      <Text className="text-gray-600 mb-6">
        Optimize stock allocation across stores based on demand.
      </Text>

      <TouchableOpacity
        onPress={runDistribution}
        className="bg-green-700 px-5 py-3 rounded-md mb-8"
      >
        <Text className="text-white text-center font-medium">
          {loading ? "Optimizing..." : "Run Distribution"}
        </Text>
      </TouchableOpacity>


    {chartUrl && (
        <View className="bg-white rounded-lg shadow p-4 mb-10">
          <Text className="text-lg font-semibold text-gray-800 mb-3">📈 Distribution Chart</Text>
          <Image
            source={{ uri: chartUrl }}
            style={{
              width: "100%",
              height: 250,
              resizeMode: "contain",
              borderRadius: 8,
            }}
          />
        </View>
      )}

      {csvData.length > 1 && (
        <View className="bg-white rounded-lg shadow p-4 mb-16">
          <Text className="text-lg font-semibold text-gray-800 mb-3">📄 Distribution Table</Text>
          {/* Headers */}
          <View className="flex-row border-b border-gray-200 pb-2 mb-2">
            {csvData[0].map((header, idx) => (
              <Text key={idx} className="flex-1 font-semibold text-gray-700">
                {header}
              </Text>
            ))}
          </View>
          {/* Rows */}
          {csvData.slice(1).filter(row => !isNaN(parseFloat(row[1]))).map((row, rowIdx) => (
            <View key={rowIdx} className="flex-row border-b border-gray-100 py-2">
              {row.map((cell, cellIdx) => (
                <Text key={cellIdx} className="flex-1 text-gray-600">
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#FFB300" />}
    </ScrollView>
  );
}
