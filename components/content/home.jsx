import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as React from "react";
import { AppContext } from "../../AuthProvider"; // Import the context
import { useContext } from "react"; // Import useContext


export function Home( {navigation}) {

      const { logoutUser } = useContext(AppContext);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
              mode="text"
              onPress={() => {
                
                console.log("Logout pressed");
                logoutUser(); // Call the logout function from context
                
              }}
            >
              Logout
            </Button>
          ),
        });
      }, [navigation]);


  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
