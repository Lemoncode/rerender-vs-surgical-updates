import type { Component } from "solid-js";
import { ColorPicker } from "./color-picker.component";
import { Icon } from "./icon.component";
import classes from "./fancy-filter.module.css";

interface Props {
  color: string;
  onColorChange: (color: string) => void;
  visibility: string;
  onVisibilityChange: (visibility: string) => void;
}

export const FancyFilter: Component<Props> = (props) => {
  const getStyles = (variant: string) =>
    props.visibility === variant ? { color: "white" } : { color: "black" };

  return (
    <div class={classes.root}>
      <ColorPicker color={props.color} onChange={props.onColorChange} />
      <button
        type="button"
        onClick={() => props.onVisibilityChange("all")}
        style={getStyles("all")}
      >
        All
      </button>
      <button type="button" onClick={() => props.onVisibilityChange("fav")}>
        <Icon class="star fill" name="star" style={getStyles("fav")} />
      </button>
      <button type="button" onClick={() => props.onVisibilityChange("unfav")}>
        <Icon class="star" name="star" style={getStyles("unfav")} />
      </button>
    </div>
  );
};
