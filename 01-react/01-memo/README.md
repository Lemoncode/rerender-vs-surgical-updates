# 01 Memo

In this example we are going to fix the problem of the previous example, we are going to update the Product component that will only render when the props change using `React.memo`.

We will take a startup point sample _00-start_.

Summary steps:

- Install previous example.
- Update `Product` component using `React.memo`.

## Steps to build it

Install previous example:

```bash
npm install

```

Update `Product` component using `React.memo`:

_./src/app.tsx_

```diff
import React from "react";
- import { Product, AddProduct } from "@/components";
+ import { Product as UnmemoizedProduct, AddProduct } from "@/components";
+ const Product = React.memo(UnmemoizedProduct);
import { getUpdated } from "@/helpers";
import { INITIAL_PRODUCTS } from "./constants";
import classes from "./app.module.css";

const ProductList = () => {
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
- const handleChange = (id) => {
+ const handleChange = React.useCallback((id) => {
    setProducts((products) => getUpdated(id, products));
- };
+ }, []);

...
```
