import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import {
  onGestureEvent,
  clamp,
  withSpring,
  useValues
} from "react-native-redash";
import {
  PanGestureHandler,
  State as GestureState
} from "react-native-gesture-handler";
import {
  cbSnapPoints,
  cWidth,
  cbLeftPos,
  cbRightPos,
  controlSpringConfig,
  cbIcons
} from "../shared/configs";

import ControlButton from "./ControlButton";

function NavigationControls() {
  const [gestureState, translationX, velocityX, offsetX] = useValues(
    [GestureState.UNDETERMINED, 0, 0, 0],
    []
  );

  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state: gestureState
  });

  const translateX = clamp(
    withSpring({
      value: translationX,
      velocity: velocityX,
      state: gestureState,
      config: controlSpringConfig,
      snapPoints: cbSnapPoints,
      offset: offsetX
    }),
    cbLeftPos,
    cbRightPos
  );

  const controlStyles = {
    transform: [{ translateX }]
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={[styles.wrapper, controlStyles]}>
          {cbIcons.map((icon, i) => (
            <ControlButton
              key={i}
              index={i}
              icon={icon}
              offsetX={offsetX}
              translateX={translateX}
              gestureState={gestureState}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default NavigationControls;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60,
    width: cWidth,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapper: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
