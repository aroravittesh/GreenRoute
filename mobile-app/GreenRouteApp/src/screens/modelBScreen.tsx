import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SpoilageForecastScreen() {
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  // 🧠 Use your MacBook IP
  const BASE_URL = "http://54.197.3.23:5786";

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const savedChart = await AsyncStorage.getItem("modelB_chart");
        const savedCsv = await AsyncStorage.getItem("modelB_csv");
        if (savedChart) setChartUrl(savedChart);
        if (savedCsv) setCsvData(JSON.parse(savedCsv));
      } catch (err) {
        console.log("⚠️ Error loading stored data:", err);
      }
    };
    loadStoredData();
  }, []);

  const runSimulation = async () => {
    setLoading(true);
    try {
      await axios.get(`${BASE_URL}/api/model-b/run`);
      const newChartUrl = `${BASE_URL}/api/model-b/image?ts=${Date.now()}`;
      const csv = await axios.get(`${BASE_URL}/api/model-b/predictions`);
      const parsed = csv.data.split("\n").map((row: string) => row.split(","));

      setChartUrl(newChartUrl);
      setCsvData(parsed);

      await AsyncStorage.setItem("modelB_chart", newChartUrl);
      await AsyncStorage.setItem("modelB_csv", JSON.stringify(parsed));
    } catch (err) {
      alert("Failed to run simulation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-lime-50 px-4 pt-16">
      <Text className="text-2xl font-bold text-gray-800 mb-2">Spoilage Forecast</Text>
      <Text className="text-gray-600 mb-6">Forecast vs Actual Sales for 30 Days</Text>

      <TouchableOpacity
        onPress={runSimulation}
        className="bg-green-700 px-5 py-3 rounded-md mb-8"
      >
        <Text className="text-white text-center font-medium">
          {loading ? "Running..." : "Run Forecast"}
        </Text>
      </TouchableOpacity>

      {chartUrl && (
        <View className="bg-white rounded-lg shadow p-4 mb-10">
          <Text className="text-lg font-semibold text-gray-800 mb-3">📈 Forecast Chart</Text>
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
          <Text className="text-lg font-semibold text-gray-800 mb-3">📄 Prediction Table</Text>
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

      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
    </ScrollView>
  );
}
