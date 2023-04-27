import React from "react";
import { Product as UnmemoizedProduct, AddProduct } from "@/components";
const Product = React.memo(UnmemoizedProduct);
import { getUpdated } from "@/helpers";
import { INITIAL_PRODUCTS } from "./constants";
import classes from "./app.module.css";

const ProductList = () => {
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
  const handleChange = React.useCallback((id) => {
    setProducts((products) => getUpdated(id, products));
  }, []);

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
