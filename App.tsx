import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Map, Navigation } from "./screens";

export default function App() {
  const screen = "Navigation";

  switch (screen) {
    case "Navigation":
      return <Navigation />;
    case "Map":
      return <Map />;
    default:
      return (
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
