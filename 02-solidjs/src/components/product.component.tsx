import type { Component } from "solid-js";
import type * as models from "@/models";
import { RenderCount } from "./render-count.component";
import { Icon } from "./icon.component";
import classes from "./product.module.css";

interface Props {
  product: models.Product;
  onChange: (id: string) => void;
}

export const Product: Component<Props> = (props) => {
  return (
    <li class={classes.root}>
      <input
        id={props.product.id}
        onInput={() => props.onChange(props.product.id)}
        type="checkbox"
        checked={props.product.fav}
      />
      <label for={props.product.id}>
        <Icon class={`star ${props.product.fav ? "fill" : ""}`} name="star" />
        <span>{props.product.name}</span>
        <span>{props.product.price}$</span>
      </label>
      <RenderCount />
    </li>
  );
};
