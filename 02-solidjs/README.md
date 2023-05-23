# Solidjs

Let's see how can we implement the previous example using `SolidJS`.

One advantage for `React` developers is that `SolidJS` makes use of `JSX`, then following this example we will just replace `useState` with `signal` and by doing that we don't need to use `useCallback` and `useMemo` for this case, why? Because the component is only rendered once thus the functions will be created only once.

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

Do you remember when we saw that `Solid JSX` already wrapped the `createEffect` function? Then, we don't need to do anything special, the filtered products will be updated when the products signal or visibility prop changes and wont' be called in color updates.

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
