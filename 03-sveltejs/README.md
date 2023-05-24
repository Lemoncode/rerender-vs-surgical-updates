# Svelte

Let's check the `Svelte` implementation of this example

In this case, components are written into `.svelte` files using a superset of HTML. In the `script` tag, we can write JavaScript/TypeScript code and define the `products` in a JavaScript variable using `let`.

So when we manipulate the array an update will be triggered, and to apply changes when the filter gets updated, we need to use a magic entry `$` this is similar to the `createEffect` in `React` (it will be triggered when any of the inner props used in that code changes).

_./src/product-list.svelte_

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
