import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModelAScreen() {
  const [productId, setProductId] = useState('');
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedChart = await AsyncStorage.getItem('modelA_chart');
        const savedCsv = await AsyncStorage.getItem('modelA_csv');
        if (savedChart) setChartUrl(savedChart);
        if (savedCsv) setCsvData(JSON.parse(savedCsv));
      } catch (err) {
        console.log('❌ Error loading saved forecast data:', err);
      }
    };
    loadSavedData();
  }, []);

  const runForecast = async () => {
    if (!productId.trim()) return alert('Please enter a product ID');
    setLoading(true);
    try {
      await axios.get(`https://sanchaya.work.gd/api/model-a/run?product_id=${productId}`);
      const chart = `https://sanchaya.work.gd/api/model-a/chart?ts=${Date.now()}`;
      const csv = await axios.get(`https://sanchaya.work.gd/api/model-a/data`);
      const parsed = csv.data.split('\n').map((row: string) => row.split(','));

      setChartUrl(chart);
      setCsvData(parsed);

      // Save to AsyncStorage
      await AsyncStorage.setItem('modelA_chart', chart);
      await AsyncStorage.setItem('modelA_csv', JSON.stringify(parsed));
    } catch (err) {
      alert('Error running forecast.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-lime-50 px-4 pt-16">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Product Sales Forecast</Text>
      <Text className="text-gray-600 mb-4">
        Forecasted unit sales for the next 30 days across top stores.
      </Text>

      {/* Input */}
      <View className="flex-row items-center gap-3 mb-6">
        <TextInput
          placeholder="Enter Product ID (e.g. 267)"
          value={productId}
          onChangeText={setProductId}
          keyboardType="numeric"
          className="border border-gray-300 px-4 py-2 rounded-md bg-white flex-1"
        />
        <TouchableOpacity
          onPress={runForecast}
          className="bg-green-700 px-4 py-2 rounded-md"
        >
          <Text className="text-white">{loading ? 'Running...' : 'Run Forecast'}</Text>
        </TouchableOpacity>
      </View>

      {/* Chart */}
      {chartUrl && (
        <View className="mb-8 bg-white rounded-md shadow p-2">
          <Image
            source={{ uri: chartUrl }}
            style={{
              width: '100%',
              height: 250,
              resizeMode: 'contain',
              borderRadius: 8,
            }}
          />
        </View>
      )}

      {/* CSV Table */}
      {csvData.length > 0 && (
        <View className="mb-16 bg-white rounded-md shadow p-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">📄 Forecast Table</Text>
          <View>
            {/* Headers */}
            <View className="flex-row border-b border-gray-200 pb-2 mb-2">
              {csvData[0].map((col, idx) => (
                <Text key={idx} className="flex-1 font-semibold text-gray-700">
                  {col}
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
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
    </ScrollView>
  );
}
