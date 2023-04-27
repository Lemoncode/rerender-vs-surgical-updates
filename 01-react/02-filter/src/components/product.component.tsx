import React from "react";
import type * as models from "@/models";
import { RenderCount } from "./render-count.component";
import { Icon } from "./icon.component";
import classes from "./product.module.css";

interface Props {
  product: models.Product;
  onChange: (id: string) => void;
}

export const Product: React.FC<Props> = (props) => {
  const { product, onChange } = props;
  return (
    <li className={classes.root}>
      <input
        id={product.id}
        onChange={() => onChange(product.id)}
        type="checkbox"
        checked={product.fav}
      />
      <label htmlFor={product.id}>
        <Icon className={`star ${product.fav ? "fill" : ""}`} name="star" />
        <span>{product.name}</span>
        <span>{product.price}$</span>
      </label>
      <RenderCount />
    </li>
  );
};
