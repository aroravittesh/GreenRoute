import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../navigation/AppNavigator";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [identifier, setIdentifier] = useState(""); // email or employee_id
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    try {
      const response = await axios.post("http://192.168.29.190:5786/api/login", {
        identifier,
        password,
      });

      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      signIn(token); // updates auth context
    } catch (error: any) {
      console.error("Login error:", error?.response?.data || error.message);
      Alert.alert("Login Failed", error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6">Login</Text>

      <TextInput
        placeholder="Email or Employee ID"
        value={identifier}
        onChangeText={setIdentifier}
        className="border border-gray-400 rounded-md w-full p-3 mb-4"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="border border-gray-400 rounded-md w-full p-3 mb-6"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 rounded-md w-full py-3 mb-4"
      >
        <Text className="text-white text-center font-semibold text-lg">Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text className="text-blue-600 underline">
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
