import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path, PathProps } from "react-native-svg";

const paths = [
  "M150 200L200 350L450 350L150 200Z",
  "M450 350L324.9 150L200 350",
  "M500 200L450 350L200 350L500 200Z"
];

const basePathConfigs: PathProps = {
  stroke: "white",
  strokeWidth: 16,
  strokeOpacity: 0.8,
  fill: "none",
  strokeLinejoin: "round"
};

const ratio = 200 / 350;
const newWidth = 60;
const newHeight = newWidth * ratio;

function CrownSvg() {
  return (
    <Svg
      style={styles.container}
      viewBox="147.5 147.5 355.5 205.5"
      width={newWidth}
      height={newHeight}
    >
      {paths.map(path => (
        <Path key={path} {...basePathConfigs} d={path} />
      ))}
    </Svg>
  );
}

export default CrownSvg;

const styles = StyleSheet.create({
  container: {
    marginTop: 80
  }
});
