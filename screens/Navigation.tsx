import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { NavigationControls, CrownSvg } from "../components";

function Navigation() {
  return (
    <View style={styles.container}>
      <CrownSvg />
      <NavigationControls />
    </View>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00003f",
    alignItems: "center"
  }
});
