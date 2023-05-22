# Solidjs

In this example we have implemented the same as the previous one but using Solidjs.

We still use `JSX` but instead of having a React state with the products we use signals. In this case, we don't need to wrap the `handleChange` function with `useCallback` nor the `filtered` with `useMemo` because these functions will be created only once.

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

Since `JSX` wraps the `createEffect` function, the filtered products will be updated when the `products` signal or visibility prop changes.

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

Also, we can expect visibility prop as value rather than signal because Solid preserves reactivity ().

_./src/app.tsx_

```jsx
export const App = () => {
  const { color, onColorChange } = useColor();
  const [visibility, setVisibility] = createSignal("all");
  return (
    <div class={classes.root}>
    ...
      <ProductList visibility={visibility()} />
    </div>
  )

```
