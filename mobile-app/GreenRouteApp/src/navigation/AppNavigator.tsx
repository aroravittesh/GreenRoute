// import React, { useState, createContext, useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import LoginScreen from "../screens/LoginScreen";
// import SignupScreen from "../screens/SignupScreen";
// import HomeScreen from "../screens/HomeScreen";

// type AuthContextType = {
//   userToken: string | null;
//   signIn: (token: string) => void;
//   signOut: () => void;
//   signUp: (token: string) => void;
// };

// const AuthContext = createContext<AuthContextType>({
//   userToken: null,
//   signIn: () => {},
//   signOut: () => {},
//   signUp: () => {},
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   const [userToken, setUserToken] = useState<string | null>(null);

//   const authContext: AuthContextType = {
//     userToken,
//     signIn: (token) => setUserToken(token),
//     signOut: () => setUserToken(null),
//     signUp: (token) => setUserToken(token),
//   };

//   return (
//     <AuthContext.Provider value={authContext}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           {userToken == null ? (
//             <>
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Signup" component={SignupScreen} />
//             </>
//           ) : (
//             <Stack.Screen name="Home" component={HomeScreen} />
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// }


import React, { useState, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import ModelAScreen from "../screens/modelAScreen";
import ModelBScreen from "../screens/modelBScreen";
import ModelCScreen from "../screens/modelCScreen";

type AuthContextType = {
  userToken: string | null;
  user: any;
  signIn: (token: string, user: any) => void;
  signOut: () => void;
  signUp: (token: string, user: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  user: null,
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
  const [user, setUser] = useState<any | null>(null);

  const authContext: AuthContextType = {
    userToken,
    user,
    signIn: (token, userData) => {
      setUserToken(token);
      setUser(userData);
    },
    signOut: () => {
      setUserToken(null);
      setUser(null);
    },
    signUp: (token, userData) => {
      setUserToken(token);
      setUser(userData);
    },
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModelA"
            component={ModelAScreen}
            options={{ headerShown: true, title: "Demand Forecast" }}
          />
          <Stack.Screen
            name="ModelB"
            component={ModelBScreen}
            options={{ headerShown: true, title: "Spoilage Sim" }}
          />
          <Stack.Screen
            name="ModelC"
            component={ModelCScreen}
            options={{ headerShown: true, title: "Smart Routing" }}
          />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
</AuthContext.Provider>

  );
}

