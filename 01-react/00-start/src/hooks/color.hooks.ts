import React from "react";
import { getPrimaryColor, setPrimaryColor } from "@/helpers";

export const useColor = () => {
  const [color, setColor] = React.useState(getPrimaryColor());

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setPrimaryColor(newColor);
  };

  return {
    color,
    onColorChange: handleColorChange,
  };
};
