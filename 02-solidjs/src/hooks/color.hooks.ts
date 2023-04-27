import { createSignal } from "solid-js";
import { getPrimaryColor, setPrimaryColor } from "@/helpers";

export const useColor = () => {
  const [color, setColor] = createSignal(getPrimaryColor());

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setPrimaryColor(newColor);
  };

  return {
    color,
    onColorChange: handleColorChange,
  };
};
