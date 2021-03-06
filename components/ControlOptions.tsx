import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import {
  withSpringTransition,
  bInterpolate,
  useValues,
} from "react-native-redash";
import { cbDims, optionSpringConfig, optionIcons } from "../shared/configs";

const { interpolate, Extrapolate, useCode, cond, greaterThan, set } = Animated;

function getIcon(icon) {
  switch (icon) {
    case "email":
      return <MaterialIcons name="email" size={24} color="black" />;
    case "todo":
      return (
        <MaterialIcons name="playlist-add-check" size={24} color="black" />
      );
    case "habit":
      return (
        <MaterialCommunityIcons name="calendar-check" size={24} color="black" />
      );
  }
}

function OptionButton({ index, icon: iconName, optionsTransition }) {
  const [optionState] = useValues([0], []);
  const optionTransition = withSpringTransition(
    optionState,
    optionSpringConfig
  );
  const start = (1 / 3) * index;
  const toTransX = (index - 1) * 48;
  const toTransY = index === 1 ? -62 : -44;

  useCode(
    () =>
      cond(
        greaterThan(optionsTransition, start),
        set(optionState, 1),
        set(optionState, 0)
      ),
    []
  );

  const translateX = bInterpolate(optionTransition, 0, toTransX);

  const translateY = bInterpolate(optionTransition, 0, toTransY);

  const opacity = interpolate(optionTransition, {
    inputRange: [0, 0.35],
    outputRange: [0, 1],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  const animatedStyles = {
    transform: [{ translateX }, { translateY }],
    opacity,
  };

  const icon = getIcon(iconName);

  return (
    <Animated.View style={[styles.option, animatedStyles]}>
      <TouchableOpacity style={styles.optionButton}>{icon}</TouchableOpacity>
    </Animated.View>
  );
}

function ControlOptions({ optionsTransition }) {
  return (
    <>
      {optionIcons.map((icon, i) => (
        <OptionButton
          key={i}
          index={i}
          icon={icon}
          optionsTransition={optionsTransition}
        />
      ))}
    </>
  );
}

export default ControlOptions;

const styles = StyleSheet.create({
  option: {
    position: "absolute",
    backgroundColor: "white",
    height: cbDims / 1.5,
    width: cbDims / 1.5,
    borderRadius: cbDims / 3,
  },
  optionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 24,
  },
});
