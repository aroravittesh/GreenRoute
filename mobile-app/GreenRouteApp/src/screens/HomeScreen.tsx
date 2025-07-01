// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { useAuth } from "../navigation/AppNavigator";

// export default function HomeScreen() {
//   const { signOut } = useAuth();

//   return (
//     <View className="flex-1 items-center justify-center bg-gray-100 p-6">
//       <Text className="text-3xl font-bold mb-8">Welcome to GreenRoute!</Text>
//       <TouchableOpacity
//         onPress={signOut}
//         className="bg-red-600 rounded-md px-6 py-3"
//       >
//         <Text className="text-white font-semibold text-lg">Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../navigation/AppNavigator";

export default function HomeScreen() {
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name || "User"}!</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cards.map((card, idx) => (
          <TouchableOpacity key={idx} style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={signOut}
          style={[styles.button, styles.logoutButton]}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const cards = [
  {
    title: "Demand Forecast",
    description: "Predict future demand for your products.",
    image: "https://www.datameer.com/wp-content/uploads/2018/06/demand-forecasting.jpg",
  },
  {
    title: "Spoilage Sim",
    description: "Simulate and optimize your supply chain.",
    image: "https://www.logisticsviewpoints.com/wp-content/uploads/2020/09/spoilage.jpg",
  },
  {
    title: "Smart Routing",
    description: "Plan efficient delivery routes.",
    image: "https://www.logisticsviewpoints.com/wp-content/uploads/2020/09/smart-routing.jpg",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#388e3c",
    marginBottom: 4,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#e53935",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
