import React from "react";
import { Img, staticFile } from "remotion";

// The real OpenCrabs logo (public/logo.png, 1234x795, transparent). Never a drawn crab.
export const Logo: React.FC<{ width: number; style?: React.CSSProperties }> = ({ width, style }) => (
  <Img
    src={staticFile("logo.png")}
    style={{ width, height: (width * 795) / 1234, objectFit: "contain", ...style }}
  />
);
