import React from "react";
import { ColorPicker } from "./color-picker.component";
import { Icon } from "./icon.component";
import classes from "./fancy-filter.module.css";

interface Props {
  color: string;
  onColorChange: (color: string) => void;
  visibility: string;
  onVisibilityChange: (visibility: string) => void;
}

export const FancyFilter: React.FC<Props> = (props) => {
  const { color, onColorChange, visibility, onVisibilityChange } = props;

  const getStyles = (variant: string) =>
    visibility === variant ? { color: "white" } : { color: "black" };

  return (
    <div className={classes.root}>
      <ColorPicker color={color} onChange={onColorChange} />
      <button
        type="button"
        onClick={() => onVisibilityChange("all")}
        style={getStyles("all")}
      >
        All
      </button>
      <button type="button" onClick={() => onVisibilityChange("fav")}>
        <Icon className="star fill" name="star" style={getStyles("fav")} />
      </button>
      <button type="button" onClick={() => onVisibilityChange("unfav")}>
        <Icon className="star" name="star" style={getStyles("unfav")} />
      </button>
    </div>
  );
};
