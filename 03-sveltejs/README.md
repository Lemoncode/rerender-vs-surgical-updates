# Svelte

In this example we have implemented the same as the previous one but using Svelte.

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
