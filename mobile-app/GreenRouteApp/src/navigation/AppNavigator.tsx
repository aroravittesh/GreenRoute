import React, { useState, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";

type AuthContextType = {
  userToken: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
  signUp: (token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [userToken, setUserToken] = useState<string | null>(null);

  const authContext: AuthContextType = {
    userToken,
    signIn: (token) => setUserToken(token),
    signOut: () => setUserToken(null),
    signUp: (token) => setUserToken(token),
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken == null ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Login" }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ title: "Sign Up" }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home" }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
