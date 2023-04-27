import React from "react";
import classes from "./color-picker.module.css";

interface Props {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = (props) => {
  const { color, onChange } = props;
  return (
    <input
      className={classes.root}
      type="color"
      value={color}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
