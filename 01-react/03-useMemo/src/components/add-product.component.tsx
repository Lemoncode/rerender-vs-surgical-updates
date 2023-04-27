import React from "react";
import type { Product } from "@/models";
import classes from "./add-product.module.css";

interface Props {
  onAdd: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const AddProduct: React.FC<Props> = (props) => {
  const { onAdd } = props;

  const [name, setName] = React.useState("");

  const handleAddProduct = () => {
    if (name) {
      onAdd((products) => [
        ...products,
        {
          id: `${Math.random()}-${name}`,
          name,
          price: Number((Math.random() * 100).toFixed(2)),
          fav: false,
        },
      ]);
      setName("");
    }
  };

  return (
    <div className={classes.root}>
      <input
        placeholder="Add product"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" onClick={handleAddProduct}>
        Add
      </button>
    </div>
  );
};
