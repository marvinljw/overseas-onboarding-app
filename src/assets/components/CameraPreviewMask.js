import React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function CameraPreviewMask(props) {
  return React.createElement(Svg, {
    width: 300,
    height: 300,
    viewBox: "0 0 300 300",
    fill: "none",
    ...props
  }, React.createElement(Path, {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M150 0H0v300h300V0H150zm0 0c82.843 0 150 67.157 150 150s-67.157 150-150 150S0 232.843 0 150 67.157 0 150 0z",
    fill: "#fff"
  }));
}

export default CameraPreviewMask;