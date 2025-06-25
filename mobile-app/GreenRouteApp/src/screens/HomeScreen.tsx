import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../navigation/AppNavigator";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      <Text className="text-3xl font-bold mb-8">Welcome to GreenRoute!</Text>
      <TouchableOpacity
        onPress={signOut}
        className="bg-red-600 rounded-md px-6 py-3"
      >
        <Text className="text-white font-semibold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
