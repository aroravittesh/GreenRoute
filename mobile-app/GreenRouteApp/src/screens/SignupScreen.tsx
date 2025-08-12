// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import { useAuth } from "../navigation/AppNavigator";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function SignupScreen({ navigation }: { navigation: any }) {
//   const [name, setName] = useState("");
//   const [employeeId, setEmployeeId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { signIn } = useAuth();

//   const handleSignup = async () => {
//     if (!name.trim() || !email.trim() || !employeeId.trim() || !password.trim()) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://54.197.3.23:5786/api/signup", {
//         name,
//         email,
//         employee_id: employeeId,
//         password,
//       });

//       Alert.alert("Signup Successful", "Please login to continue");
//         navigation.navigate("Login");
//     } catch (error: any) {
//       console.error("Signup error:", error?.response?.data || error.message);
//       Alert.alert("Signup Failed", error?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <View className="flex-1 justify-center items-center bg-white px-6">
//       <Text className="text-3xl font-bold mb-6">Sign Up</Text>

//       <TextInput
//         placeholder="Full Name"
//         value={name}
//         onChangeText={setName}
//         className="border border-gray-400 rounded-md w-full p-3 mb-4"
//       />
//       <TextInput
//         placeholder="Employee ID"
//         value={employeeId}
//         onChangeText={setEmployeeId}
//         className="border border-gray-400 rounded-md w-full p-3 mb-4"
//         autoCapitalize="characters"
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         className="border border-gray-400 rounded-md w-full p-3 mb-4"
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         className="border border-gray-400 rounded-md w-full p-3 mb-6"
//         secureTextEntry
//       />

//       <TouchableOpacity
//         onPress={handleSignup}
//         className="bg-green-600 rounded-md w-full py-3 mb-4"
//       >
//         <Text className="text-white text-center font-semibold text-lg">Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text className="text-green-600 underline">
//           Already have an account? Log In
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useAuth } from "../navigation/AppNavigator";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }) {
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
      const response = await axios.post("http://54.197.3.23:5786/api/signup", {
        name,
        email,
        employee_id: employeeId,
        password,
      });

      Alert.alert("Signup Successful", "Please login to continue");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Signup error:", error?.response?.data || error.message);
      Alert.alert("Signup Failed", error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#a1887f"
          style={styles.input}
        />
        <TextInput
          placeholder="Employee ID"
          value={employeeId}
          onChangeText={setEmployeeId}
          placeholderTextColor="#a1887f"
          style={styles.input}
          autoCapitalize="characters"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#a1887f"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#a1887f"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f8e9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#388e3c",
    fontFamily: "PT Sans",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f1f8e9",
    borderColor: "#c8e6c9",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#333",
    fontFamily: "PT Sans",
  },
  button: {
    backgroundColor: "#388e3c",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "PT Sans",
    textAlign: "center",
    fontSize: 16,
  },
  loginText: {
    fontFamily: "PT Sans",
    textAlign: "center",
    color: "#a1887f",
  },
  loginLink: {
    color: "#388e3c",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
