import React from "react";
import classes from "./render-count.module.css";

const getClassName = (count: number) =>
  count >= 10
    ? count > 25
      ? classes.error
      : classes.warning
    : classes.success;

export const RenderCount = () => {
  const count = React.useRef(0);
  count.current = count.current + 1;
  return (
    <span className={`${classes.root} ${getClassName(count.current)}`}>
      {count.current}
    </span>
  );
};
