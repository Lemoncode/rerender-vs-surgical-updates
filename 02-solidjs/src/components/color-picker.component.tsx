import type { Component } from "solid-js";
import classes from "./color-picker.module.css";

interface Props {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: Component<Props> = (props) => {
  return (
    <input
      class={classes.root}
      type="color"
      value={props.color}
      onInput={(event) => props.onChange(event.currentTarget.value)}
    />
  );
};
