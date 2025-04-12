// AuthFlow.jsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LocalPreferences from "../utils/local_preferences"; // Adjust the import path as necessary
import { Login } from "./auth/Login"; // Adjust the import path as necessary
import { Home } from "./content/Home"; // Adjust the import path as necessary

const Stack = createStackNavigator();

const AuthFlow = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means not checked yet

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const loggedIn = await LocalPreferences.retrieveData("isLoggedIn", "bool") ?? false;
        console.log("Retrieved isLoggedIn:", loggedIn); // Debug log
        setIsAuthenticated(loggedIn);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false); // Default to not authenticated on error
      }
    };
  
    checkAuthentication();
  }, []);

  // While the authentication status is being determined, show a loading indicator
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render Home if authenticated, otherwise render Login
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default AuthFlow;
