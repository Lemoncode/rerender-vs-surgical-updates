# Overview

In this example we have implemented using React, Solidjs and Svelte a demo similar to the one they did in the 2021 React Conf presenting React Forget.

## React

Here we have a list of products where we can add a new one or update it by marking it as fav or unfav. Notice that all products are re-rendered even if we don't update their properties. 

The React recommendation here is create a memoized `Product` component using `React.memo` that will only render when the properties change. We cannot forget the `useCallback` on the handle change function:

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

> NOTE: Now, just re-render the product we are updating.

But as the application gets more complex, we may find other challenges, for example, we have to create a `FancyFilter` component to update the color and filter the product list:

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

The above fix still works but we are calling the `getFiltered` function even if we only changes the color.

In most applications this may not be a problem, but if we need a good user experience on devices with fewer resources, for example on mobile device, we may want to avoid unnecessary calculations.

> NOTE: we can simulate it using the `Performance` tab in the browser dev tools.

In that case, we need to use `React.useMemo` to memoize the result of the `getFiltered` function that depends on the `products` and `visibility`:

_./src/app.tsx_

```diff
...

const ProductList = ({ visibility }) => {
  const [products, setProducts] = React.useState(INITIAL_PRODUCTS);
  const handleChange = React.useCallback((id) => {
    setProducts((products) => getUpdated(id, products));
  }, []);
- const filtered = getFiltered(products, visibility);
+ const filtered = React.useMemo(
+   () => getFiltered(products, visibility),
+   [products, visibility]
+ );

...

```

Depending on the device it may go faster or slower, but we have improved somewhat.

## SolidJS

In this example we have implemented the same as the previous one but using SolidJS.

We still use `JSX` but instead of having a React state with the products we use signals. In this case, we don't need to wrap the `handleChange` function with `useCallback` nor the `filtered` with `useMemo` because these functions will be created only once (even if we update the properties of that product).

_./src/app.tsx_

```jsx
const ProductList = (props) => {
  const [products, setProducts] = createSignal(INITIAL_PRODUCTS);
  const handleChange = (id) => {
    setProducts((products) => getUpdated(id, products));
  };
  const filtered = () => getFiltered(products(), props.visibility);
...

```

Since `JSX` wraps the `createEffect` function, the filtered products will be updated when the `products` signal or visibility prop changes but not in color updates.

_./src/app.tsx_

```jsx
const ProductList = (props) => {
  const [products, setProducts] = createSignal(INITIAL_PRODUCTS);
  const handleChange = (id) => {
    setProducts((products) => getUpdated(id, products));
  };
  const filtered = () => getFiltered(products(), props.visibility);

  return (
    <>
      <ul>
        <For each={filtered()}>
          {(product) => <Product product={product} onChange={handleChange} />}
        </For>
      </ul>
      <AddProduct onAdd={setProducts} />
    </>
  );
};
```

> NOTE: Also, we can simulate it using the `Performance` tab in the browser dev tools and we see that the performance is much better.

## Svelte

In this case, components are written into `.svelte` files using a superset of HTML. In the `script` tag, we can write JavaScript/TypeScript code and define the `products` in a JavaScript variable using `let`.

We will change the array reference when we add a new product or change the product status and using the `$` trick we will tell the compiler that the `filtered` variable will be recalculated when the `products` or `visibility` change.

```js
...
 let products = INITIAL_PRODUCTS;
  const handleAdd = (event: CustomEvent<{ product: models.Product }>) => {
    products = [...products, event.detail.product];
  };

  const handleChange = (event: CustomEvent<{ id: string }>) => {
    products = getUpdated(event.detail.id, products);
  };
  $: filtered = getFiltered(products, visibility);
...

```

> NOTE: Performance on a slower device is similar to SolidJS.
