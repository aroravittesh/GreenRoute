// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { useAuth } from "../navigation/AppNavigator";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// export default function LoginScreen({ navigation }: { navigation: any }) {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { signIn } = useAuth();

//   const handleLogin = async () => {
//     if (!identifier.trim() || !password.trim()) {
//       Alert.alert("Error", "Please enter all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.29.190:5786/api/login", {
//         identifier,
//         password,
//       });

//       const { token, user } = response.data;
//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("user", JSON.stringify(user));

//       signIn(token);
//     } catch (error: any) {
//       console.error("Login error:", error?.response?.data || error.message);
//       Alert.alert("Login Failed", error?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-gray-100"
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View className="flex-1 justify-center items-center px-6">
//           <View className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
//             <Text className="text-3xl font-extrabold text-center text-gray-800 mb-1">
//               Welcome Back 👋
//             </Text>
//             <Text className="text-center text-gray-500 text-sm mb-6">
//               Please login to your account
//             </Text>

//             <TextInput
//               placeholder="Email or Employee ID"
//               value={identifier}
//               onChangeText={setIdentifier}
//               placeholderTextColor="#9ca3af"
//               className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
//               autoCapitalize="none"
//             />

//             <TextInput
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               placeholderTextColor="#9ca3af"
//               secureTextEntry
//               className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-800"
//             />

//             <TouchableOpacity
//               onPress={handleLogin}
//               className="bg-blue-600 py-3 rounded-full mb-4"
//             >
//               <Text className="text-white text-center font-semibold text-base">
//                 Log In
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//               <Text className="text-center text-sm text-gray-500">
//                 Don’t have an account?{" "}
//                 <Text className="text-blue-600 font-semibold underline">
//                   Sign Up
//                 </Text>
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { useAuth } from "../navigation/AppNavigator";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// export default function LoginScreen({ navigation }: { navigation: any }) {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { signIn } = useAuth();

//   const handleLogin = async () => {
//     if (!identifier.trim() || !password.trim()) {
//       Alert.alert("Error", "Please enter all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.29.190:5786/api/login", {
//         identifier,
//         password,
//       });

//       const { token, user } = response.data;
//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("user", JSON.stringify(user));

//       signIn(token);
//     } catch (error: any) {
//       console.error("Login error:", error?.response?.data || error.message);
//       Alert.alert("Login Failed", error?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollView}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.innerContainer}>
//           <View style={styles.card}>
//             <Text style={styles.title}>Welcome Back 👋</Text>
//             <Text style={styles.subtitle}>Please login to your account</Text>

//             <TextInput
//               placeholder="Email or Employee ID"
//               value={identifier}
//               onChangeText={setIdentifier}
//               placeholderTextColor="#9ca3af"
//               style={styles.input}
//               autoCapitalize="none"
//             />

//             <TextInput
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               placeholderTextColor="#9ca3af"
//               secureTextEntry
//               style={styles.input}
//             />

//             <TouchableOpacity
//               onPress={handleLogin}
//               style={styles.button}
//             >
//               <Text style={styles.buttonText}>Log In</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//               <Text style={styles.signupText}>
//                 Don’t have an account?{" "}
//                 <Text style={styles.signupLink}>Sign Up</Text>
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f4f8', // Subtle background color
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   card: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#e0e7ff', // Light blue background for inputs
//     borderColor: '#cbd5e1',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#3b82f6', // Blue button
//     paddingVertical: 15,
//     borderRadius: 30,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   signupText: {
//     textAlign: 'center',
//     color: '#666',
//   },
//   signupLink: {
//     color: '#3b82f6',
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//   },
// });


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { useAuth } from "../navigation/AppNavigator"; // Adjust the import path as needed
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// export default function LoginScreen({ navigation }) {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { signIn } = useAuth();

//   const handleLogin = async () => {
//     if (!identifier.trim() || !password.trim()) {
//       Alert.alert("Error", "Please enter all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.29.190:5786/api/login", {
//         identifier,
//         password,
//       });

//       const { token, user } = response.data;
//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("user", JSON.stringify(user));

//       signIn(token);
//     } catch (error) {
//       console.error("Login error:", error?.response?.data || error.message);
//       Alert.alert("Login Failed", error?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <Text style={styles.title}>GreenRoute</Text>
//         <Text style={styles.subtitle}>Please login to your account</Text>

//         <TextInput
//           placeholder="Email or Employee ID"
//           value={identifier}
//           onChangeText={setIdentifier}
//           placeholderTextColor="#9ca3af"
//           style={styles.input}
//           autoCapitalize="none"
//         />

//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           placeholderTextColor="#9ca3af"
//           secureTextEntry
//           style={styles.input}
//         />

//         <TouchableOpacity onPress={handleLogin} style={styles.button}>
//           <Text style={styles.buttonText}>Log In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//           <Text style={styles.signupText}>
//             Don’t have an account?{" "}
//             <Text style={styles.signupLink}>Sign Up</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4caf50', // Solid green background
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   innerContainer: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#e0e7ff', // Light blue background for inputs
//     borderColor: '#cbd5e1',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#388e3c', // Darker green button
//     paddingVertical: 15,
//     borderRadius: 30,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   signupText: {
//     textAlign: 'center',
//     color: '#666',
//   },
//   signupLink: {
//     color: '#388e3c', // Green color for sign-up link
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//   },
// });


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { useAuth } from "../navigation/AppNavigator"; // Adjust the import path as needed
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// export default function LoginScreen({ navigation }) {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { signIn } = useAuth();

//   const handleLogin = async () => {
//     if (!identifier.trim() || !password.trim()) {
//       Alert.alert("Error", "Please enter all fields");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.29.190:5786/api/login", {
//         identifier,
//         password,
//       });

//       const { token, user } = response.data;
//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("user", JSON.stringify(user));

//       signIn(token);
//     } catch (error) {
//       console.error("Login error:", error?.response?.data || error.message);
//       Alert.alert("Login Failed", error?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <Text style={styles.title}>GreenRoute</Text>
//         <Text style={styles.subtitle}>Please login to your account</Text>

//         <TextInput
//           placeholder="Email or Employee ID"
//           value={identifier}
//           onChangeText={setIdentifier}
//           placeholderTextColor="#9ca3af"
//           style={styles.input}
//           autoCapitalize="none"
//         />

//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           placeholderTextColor="#9ca3af"
//           secureTextEntry
//           style={styles.input}
//         />

//         <TouchableOpacity onPress={handleLogin} style={styles.button}>
//           <Text style={styles.buttonText}>Log In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//           <Text style={styles.signupText}>
//             Don’t have an account?{" "}
//             <Text style={styles.signupLink}>Sign Up</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e8f5e9', // Light green background for a softer look
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   innerContainer: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#f1f8e9', // Light background for inputs
//     borderColor: '#c8e6c9',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#388e3c', // Darker green button
//     paddingVertical: 15,
//     borderRadius: 30,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   signupText: {
//     textAlign: 'center',
//     color: '#666',
//   },
//   signupLink: {
//     color: '#388e3c', // Green color for sign-up link
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useAuth } from "../navigation/AppNavigator"; // Adjust the import path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState("");
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

      signIn(token, user);
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      Alert.alert("Login Failed", error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sanchaya</Text>
        <Text style={styles.subtitle}>Please login to your account</Text>

        <TextInput
          placeholder="Email or Employee ID"
          value={identifier}
          onChangeText={setIdentifier}
          placeholderTextColor="#a1887f"
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#a1887f"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#388e3c',
    fontFamily: 'PT Sans',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'PT Sans',
    textAlign: 'center',
    color: '#a1887f',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f8e9',
    borderColor: '#c8e6c9',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#333',
    fontFamily: 'PT Sans',
  },
  button: {
    backgroundColor: '#388e3c',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'PT Sans',
    textAlign: 'center',
    fontSize: 16,
  },
  signupText: {
    fontFamily: 'PT Sans',
    textAlign: 'center',
    color: '#a1887f',
  },
  signupLink: {
    color: '#388e3c',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
