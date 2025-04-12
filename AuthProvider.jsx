import React from "react"; // Add this import
import LocalPreferences from "./utils/local_preferences"; // Import LocalPreferences
import { useEffect } from "react"; // Import useEffect

export const AppContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [login, setLogin] = React.useState(false);

      // Load the initial value from shared preferences
  useEffect(() => {
    const loadLoginState = async () => {
      const storedLoginState = await LocalPreferences.retrieveData("isLoggedIn", "bool");
      setLogin(storedLoginState ?? false); // Default to false if null
    };

    loadLoginState();
  }, []);

    const loginUser = async () => {
        await LocalPreferences.storeData("isLoggedIn", true);
        setLogin(true);
    }
    const logoutUser = async () => {
        LocalPreferences.storeData("isLoggedIn", false);
        setLogin(false);
    }

    return (
        <AppContext.Provider value={{ login, loginUser, logoutUser }}>
            {children}
        </AppContext.Provider>
    );
}