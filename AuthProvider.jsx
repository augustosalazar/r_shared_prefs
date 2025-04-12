import React from "react"; // Add this import
import LocalPreferences from "./utils/local_preferences"; // Import LocalPreferences
import { useEffect } from "react"; // Import useEffect

export const AppContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = React.useState(false);

  // Load the initial value from shared preferences
  useEffect(() => {
    const loadLoginState = async () => {
      const storedLoginState = await LocalPreferences.retrieveData(
        "isLoggedIn",
        "bool"
      );
      setLogin(storedLoginState ?? false); // Default to false if null
    };

    loadLoginState();
  }, []);

  const loginUser = async (email, password) => {
    const storedEmail = await LocalPreferences.retrieveData("email", "string") || "noemail";
    const storedPassword = await LocalPreferences.retrieveData("password", "string") || "nopassowrd";
    console.log("Stored Info:", storedEmail, storedPassword);
    console.log("Input Info:", email, password);
    

    if (email === storedEmail && password === storedPassword) {
      await LocalPreferences.storeData("isLoggedIn", true);
      setLogin(true);
    } else {
      console.log("Invalid credentials");
      throw new Error("Invalid credentials"); // Throw an error if credentials are invalid
    }
  };
  const logoutUser = async () => {
    LocalPreferences.storeData("isLoggedIn", false);
    setLogin(false);
  };
  const signupUser = async (email, password) => {
    await LocalPreferences.storeData("email", email);
    await LocalPreferences.storeData("password", password);
  };

  return (
    <AppContext.Provider value={{ login, loginUser, logoutUser, signupUser }}>
      {children}
    </AppContext.Provider>
  );
};
