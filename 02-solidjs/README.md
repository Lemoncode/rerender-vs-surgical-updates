# Solidjs

In this example we have implemented the same as the previous one but using Solidjs.

We still use `JSX` but instead of having a React state with the products we use signals. In this case, we don't need to wrap the `handleChange` function with `useCallback` nor the `filtered` with `useMemo` because these functions will be created only once.

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

Also, we can expect visibility prop as value rather than signal because Solid preserves reactivity by wrapping these in getters.

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

Becomes:

```js
ProductList({
  get visibility() {
    return visibility();
  },
});
```

But you cannot do destructuring of the visibility prop because we would lose the reactivity. However, if we could do it inside the `createEffect` or `createMemo` because these functions preserve reactivity.

```jsx
 const visibility = createMemo(() => {
    const { visibility } = props;
    return visibility;
  });

```
