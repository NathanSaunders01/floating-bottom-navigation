export const cbDims = 64;
export const cWidth = cbDims * 3;
export const cHalfWidth = cWidth / 2;
export const cbLeftPos = -cbDims;
export const cbRightPos = cbDims;
export const cbSnapPoints = [cbLeftPos, 0, cbRightPos];
export const gestureRange = cbRightPos * 2;
export const scaleOutputRange = [0.7, 1, 0.7];
export const opacityOutputRange = scaleOutputRange;
export const cbIcons = ["format-list-bulleted", "add", "check"];
export const optionIcons = ["T", "H", "R"];
export const cbRadius = cbDims / 2;
export const cbStrokeWidth = 4;

export const optionSpringConfig = {
  damping: 15,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001
};

export const controlSpringConfig = {
  damping: 40,
  mass: 1,
  stiffness: 500,
  overshootClamping: true,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001
};
