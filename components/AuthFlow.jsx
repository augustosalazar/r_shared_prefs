// AuthFlow.jsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import LocalPreferences from '../utils/local_preferences'; // Adjust the import path as necessary
import Login from './auth/login'; // Import your Login component
import Home from './content/home'; // Import your Home component


const AuthFlow = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means not checked yet

  useEffect(() => {
    const checkAuthentication = async () => {
      // Retrieve the stored boolean value indicating if the user is logged in
      const loggedIn = await LocalPreferences.retrieveData('isLoggedIn', 'bool');
      setIsAuthenticated(loggedIn);
    };

    checkAuthentication();
  }, []);

  // While the authentication status is being determined, show a loading indicator
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render Home if authenticated, otherwise render Login
  return isAuthenticated ? <Home /> : <Login />;
};

export default AuthFlow;
