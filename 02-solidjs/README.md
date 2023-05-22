# Solidjs

In this example we have implemented the same as the previous one but using Solidjs.

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
