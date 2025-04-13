import React from "react"; // Add this import
import { useEffect } from "react"; // Import useEffect
import PrefsService from "../services/prefs_service"; // Import SharedPrefsService

export const AppContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = React.useState(false);

  // Load the initial value from shared preferences
  useEffect(() => {
    const loadLoginState = async () => {
      const storedLoginState = await PrefsService.isLoggedIn();
      setLogin(storedLoginState ?? false); // Default to false if null
    };

    loadLoginState();
  }, []);

  const loginUser = async (email, password) => {
    try {
      await PrefsService.login(email, password);
      setLogin(true);
    } catch (error) {
      throw error;
    }
  };
  const logoutUser = async () => {
    await PrefsService.logout();
    setLogin(false);
  };
  const signupUser = async (email, password) => {
    console.log("provider signupUser called with:", email, password);

    try {
      await PrefsService.signUp(email, password);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; // Propagate the error
    }
  };

  return (
    <AppContext.Provider value={{ login, loginUser, logoutUser, signupUser }}>
      {children}
    </AppContext.Provider>
  );
};
