import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../navigation/AppNavigator";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !employeeId.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://192.168.29.190:5786/api/signup", {
        name,
        email,
        employee_id: employeeId,
        password,
      });

      Alert.alert("Signup Successful", "Please login to continue");
        navigation.navigate("Login");
    } catch (error: any) {
      console.error("Signup error:", error?.response?.data || error.message);
      Alert.alert("Signup Failed", error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6">Sign Up</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        className="border border-gray-400 rounded-md w-full p-3 mb-4"
      />
      <TextInput
        placeholder="Employee ID"
        value={employeeId}
        onChangeText={setEmployeeId}
        className="border border-gray-400 rounded-md w-full p-3 mb-4"
        autoCapitalize="characters"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-400 rounded-md w-full p-3 mb-4"
        keyboardType="email-address"
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
        onPress={handleSignup}
        className="bg-green-600 rounded-md w-full py-3 mb-4"
      >
        <Text className="text-white text-center font-semibold text-lg">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="text-green-600 underline">
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
