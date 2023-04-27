import { createSignal } from "solid-js";
import classes from "./render-count.module.css";

const getClassName = (count: number) =>
  count >= 10
    ? count > 25
      ? classes.error
      : classes.warning
    : classes.success;

export const RenderCount = () => {
  const [count, setCount] = createSignal(0);
  setCount(count() + 1);

  return (
    <span class={`${classes.root} ${getClassName(count())}`}>{count()}</span>
  );
};
