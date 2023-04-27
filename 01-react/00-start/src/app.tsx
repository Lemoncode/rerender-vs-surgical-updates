import React from "react";
import { Product, AddProduct } from "@/components";
import { getUpdated } from "@/helpers";
import { INITIAL_PRODUCTS } from "./constants";
import classes from "./app.module.css";

const ProductList = () => {
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
  const handleChange = (id) => {
    setProducts((products) => getUpdated(id, products));
  };

  return (
    <>
      <ul>
        {products.map((product) => (
          <Product key={product.id} product={product} onChange={handleChange} />
        ))}
      </ul>
      <AddProduct onAdd={setProducts} />
    </>
  );
};

export const App = () => {
  return (
    <div className={classes.root}>
      <ProductList />
    </div>
  );
};
