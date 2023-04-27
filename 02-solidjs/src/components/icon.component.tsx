import type { Component, JSX } from "solid-js";

interface Props {
  name: string;
  class: string;
  style?: JSX.CSSProperties;
}

export const Icon: Component<Props> = (props) => {
  return (
    <span
      style={props.style}
      class={`material-symbols-outlined ${props.class}`}
    >
      {props.name}
    </span>
  );
};
