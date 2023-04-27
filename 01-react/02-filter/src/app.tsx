import React from "react";
import {
  Product as UnmemoizedProduct,
  AddProduct,
  FancyFilter,
} from "@/components";
const Product = React.memo(UnmemoizedProduct);
import { useColor } from "@/hooks";
import { getUpdated, getFiltered } from "@/helpers";
import { INITIAL_PRODUCTS } from "./constants";
import classes from "./app.module.css";

const ProductList = ({ visibility }) => {
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
  const handleChange = React.useCallback((id) => {
    setProducts((products) => getUpdated(id, products));
  }, []);
  const filtered = getFiltered(products, visibility);

  return (
    <>
      <ul>
        {filtered.map((product) => (
          <Product key={product.id} product={product} onChange={handleChange} />
        ))}
      </ul>
      <AddProduct onAdd={setProducts} />
    </>
  );
};

export const App = () => {
  const { color, onColorChange } = useColor();
  const [visibility, setVisibility] = React.useState("all");

  return (
    <div className={classes.root}>
      <FancyFilter
        color={color}
        onColorChange={onColorChange}
        visibility={visibility}
        onVisibilityChange={setVisibility}
      />
      <ProductList visibility={visibility} />
    </div>
  );
};
