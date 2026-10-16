import { useVideoConfig } from "remotion";

/** Same scenes drive the 16:9 and 9:16 cuts; this tells a scene which one it is in. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  return { width, height, vertical };
};
