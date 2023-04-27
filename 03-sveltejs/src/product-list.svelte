<script lang="ts">
  import { Product, AddProduct } from "@/components";
  import type * as models from "./models";
  import { getUpdated, getFiltered } from "@/helpers";
  import { INITIAL_PRODUCTS } from "./constants";

  export let visibility: string;

  let products = INITIAL_PRODUCTS;
  const handleAdd = (event: CustomEvent<{ product: models.Product }>) => {
    products = [...products, event.detail.product];
  };

  const handleChange = (event: CustomEvent<{ id: string }>) => {
    products = getUpdated(event.detail.id, products);
  };
  $: filtered = getFiltered(products, visibility);
</script>

<ul>
  {#each filtered as product (product.id)}
    <Product {product} on:change={handleChange} />
  {/each}
</ul>
<AddProduct on:add={handleAdd} />

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
