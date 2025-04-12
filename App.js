import AuthFlow from "./components/AuthFlow";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthFlow />
      </NavigationContainer>
    </PaperProvider>
  );
}


