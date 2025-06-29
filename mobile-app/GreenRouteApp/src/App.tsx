import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator"; // Your stack navigator
import "../global.css";

export default function App() {
  return (

      <AppNavigator />
  );
}
