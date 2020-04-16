import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import {
  onGestureEvent,
  withTimingTransition,
  timing,
  bInterpolate,
  approximates,
  useValues,
} from "react-native-redash";
import {
  TapGestureHandler,
  State as TapState,
} from "react-native-gesture-handler";
import Svg, {
  Circle,
  G,
  Use,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import {
  cbDims,
  scaleOutputRange,
  opacityOutputRange,
  cbRadius,
  cbStrokeWidth,
} from "../shared/configs";
import ControlOptions from "./ControlOptions";

const {
  Clock,
  interpolate,
  Extrapolate,
  multiply,
  useCode,
  cond,
  eq,
  neq,
  and,
  set,
  not,
  onChange,
  clockRunning,
  createAnimatedComponent,
} = Animated;

const AnimatedCircle = createAnimatedComponent(Circle);

function ControlButton({ index, translateX, offsetX, icon, gestureState }) {
  const [tapState, shouldSwitch, optionsState] = useValues(
    [TapState.UNDETERMINED, 0, 0],
    []
  );
  const xPos = -(index - 1) * cbDims;
  const isCentered = approximates(translateX, xPos);
  const clock = new Clock();

  const gestureHandler = onGestureEvent({ state: tapState });

  const optionsTransition = withTimingTransition(optionsState, {
    duration: 220,
  });

  useCode(
    () => cond(eq(gestureState, TapState.BEGAN), set(optionsState, 0)),
    []
  );

  useCode(
    () =>
      onChange(
        isCentered,
        cond(
          and(isCentered, neq(gestureState, TapState.UNDETERMINED)),
          set(optionsState, 1),
          set(optionsState, 0)
        )
      ),
    [isCentered]
  );

  useCode(() => cond(eq(tapState, TapState.END), set(shouldSwitch, 1)), []);

  // WITH TAP TO MENU - NOT REALLY WORKING
  // useCode(
  //   () =>
  //     cond(eq(shouldSwitch, 1), [
  //       cond(
  //         not(isCentered),
  //         set(
  //           offsetX,
  //           timing({
  //             clock,
  //             duration: 320,
  //             from: offsetX,
  //             to: xPos,
  //             easing: Easing.linear
  //           })
  //         )
  //       ),
  //       cond(and(not(clockRunning(clock)), eq(xPos, offsetX)), [
  //         set(shouldSwitch, 0)
  //       ]),
  //       set(optionsState, not(optionsState))
  //     ]),
  //   []
  // );

  // NO TAP TO MENU - WORKING
  useCode(
    () =>
      cond(and(isCentered, eq(shouldSwitch, 1)), [
        set(optionsState, not(optionsState)),
        set(shouldSwitch, 0),
      ]),
    []
  );

  const inputRange = [
    (index - 2) * cbDims,
    (index - 1) * cbDims,
    index * cbDims,
  ];

  const scale = interpolate(multiply(translateX, -1), {
    inputRange,
    outputRange: scaleOutputRange,
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY = interpolate(multiply(translateX, -1), {
    inputRange,
    outputRange: [0.15 * cbDims, 0, 0.15 * cbDims],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(multiply(translateX, -1), {
    inputRange,
    outputRange: opacityOutputRange,
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedStyled = {
    transform: [{ scale }, { translateY }],
    opacity,
  };

  const openIconStyles = {
    transform: [
      {
        rotate: interpolate(optionsTransition, {
          inputRange: [0, 0.5],
          outputRange: [0, 22],
          extrapolate: Extrapolate.CLAMP,
        }),
      },
      {
        scale: interpolate(optionsTransition, {
          inputRange: [0, 0.4],
          outputRange: [1, 0],
          extrapolate: Extrapolate.CLAMP,
        }),
      },
    ],
    opacity: interpolate(optionsTransition, {
      inputRange: [0, 0.4],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
  };

  const closeIconStyles = {
    transform: [
      {
        rotate: interpolate(optionsTransition, {
          inputRange: [0.5, 1],
          outputRange: [0, 22],
          extrapolate: Extrapolate.CLAMP,
        }),
      },
      {
        scale: interpolate(optionsTransition, {
          inputRange: [0.6, 1],
          outputRange: [0, 1],
          extrapolate: Extrapolate.CLAMP,
        }),
      },
    ],
    opacity: interpolate(optionsTransition, {
      inputRange: [0.6, 1],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    }),
  };

  const strokeDasharray = 2 * Math.PI * (cbRadius - cbStrokeWidth / 2);
  const strokeDashoffset = bInterpolate(optionsTransition, strokeDasharray, 0);

  return (
    <View style={styles.container}>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View style={[styles.button, animatedStyled]}>
          <Svg width={cbDims} height={cbDims}>
            <Defs>
              <LinearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#FFA500" />
                <Stop offset="50%" stopColor="#FFC966" />
              </LinearGradient>
            </Defs>
            <G id="circle" rotation="-90" origin={`${cbRadius}, ${cbRadius}`}>
              <AnimatedCircle
                r={cbRadius - cbStrokeWidth / 2}
                cx={cbRadius}
                cy={cbRadius}
                stroke="url(#linear)"
                fill="none"
                strokeWidth={cbStrokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            </G>
            <Use href="#circle" />
          </Svg>
          <Animated.View style={[styles.icon, closeIconStyles]}>
            <MaterialIcons name="close" size={42} color="black" />
          </Animated.View>
          <Animated.View style={[styles.icon, openIconStyles]}>
            <MaterialIcons name={icon} size={42} color="black" />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
      <ControlOptions optionsTransition={optionsTransition} />
    </View>
  );
}

export default ControlButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    overflow: "visible",
  },
  button: {
    height: cbDims,
    width: cbDims,
    backgroundColor: "white",
    borderRadius: cbRadius,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
  },
});
