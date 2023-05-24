# 02 Filter

In this example we are going to add a `FancyFilter` component and see whats happened with the re-renders.

We will take a startup point sample _01-memo_.

Summary steps:

- Install previous example.
- Update `App` component using `FancyFilter`.

## Steps to build it

Install previous example:

```bash
npm install

```

Update `App` component using `FancyFilter`:

_./src/app.tsx_

```diff
import React from "react";
import {
  Product as UnmemoizedProduct,
  AddProduct,
+ FancyFilter,
} from "@/components";
const Product = React.memo(UnmemoizedProduct);
+ import { useColor } from "@/hooks";
- import { getUpdated } from "@/helpers";
+ import { getUpdated, getFiltered } from "@/helpers";
import { INITIAL_PRODUCTS } from "./constants";
import classes from "./app.module.css";

- const ProductList = () => {
+ const ProductList = ({ visibility }) => {  
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
  const handleChange = React.useCallback((id) => {
    setProducts((products) => getUpdated(id, products));
  }, []);
+ const filtered = getFiltered(products, visibility);

  return (
    <>
      <ul>
-       {products.map((product) => (
+       {filtered.map((product) => (
          <Product key={product.id} product={product} onChange={handleChange} />
        ))}
      </ul>
      <AddProduct onAdd={setProducts} />
    </>
  );
};

export const App = () => {
+ const { color, onColorChange } = useColor();
+ const [visibility, setVisibility] = React.useState("all");

  return (
    <div className={classes.root}>
+     <FancyFilter
+       color={color}
+       onColorChange={onColorChange}
+       visibility={visibility}
+       onVisibilityChange={setVisibility}
+     />
-     <ProductList />
+     <ProductList visibility={visibility} />
    </div>
  );
};

```
