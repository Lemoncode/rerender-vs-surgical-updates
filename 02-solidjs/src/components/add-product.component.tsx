import type { Component, Setter } from "solid-js";
import { createSignal } from "solid-js";
import type { Product } from "@/models";
import classes from "./add-product.module.css";

interface Props {
  onAdd: Setter<Product[]>;
}

export const AddProduct: Component<Props> = (props) => {
  const [name, setName] = createSignal("");

  const handleAddProduct = () => {
    if (name()) {
      props.onAdd((products) => [
        ...products,
        {
          id: `${Math.random()}-${name()}`,
          name: name(),
          price: Number((Math.random() * 100).toFixed(2)),
          fav: false,
        },
      ]);
      setName("");
    }
  };

  return (
    <div class={classes.root}>
      <input
        placeholder="Add product"
        type="text"
        value={name()}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <button type="submit" onClick={handleAddProduct}>
        Add
      </button>
    </div>
  );
};
