import { writable } from "svelte/store";
import { getPrimaryColor, setPrimaryColor } from "@/helpers";

export const useColor = () => {
  const color = writable(getPrimaryColor());

  const handleColorChange = (newColor) => {
    color.set(newColor);
    setPrimaryColor(newColor);
  };

  return {
    color,
    onColorChange: handleColorChange,
  };
};
