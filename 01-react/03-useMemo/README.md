# 03 UseMemo

In this example we are going to fix the problem of the previous example, we are going to use `React.useMemo` in `getFiltered` function.

We will take a startup point sample _02-filter_.

Summary steps:

- Install previous example.
- Update `App` component using `React.useMemo`.

## Steps to build it

Install previous example:

```bash
npm install

```

Update `App` component using `React.useMemo`:

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
