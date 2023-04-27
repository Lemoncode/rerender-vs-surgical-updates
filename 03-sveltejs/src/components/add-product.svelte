<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Product } from "@/models";

  const dispatch = createEventDispatcher();
  const onAdd = (product: Product) => {
    dispatch("add", {
      product,
    });
  };

  let name = "";
  const handleAddProduct = () => {
    if (name) {
      onAdd({
        id: `${Math.random()}-${name}`,
        name,
        price: Number((Math.random() * 100).toFixed(2)),
        fav: false,
      });
      name = "";
    }
  };
</script>

<div class="root">
  <input placeholder="Add product" type="text" bind:value={name} />
  <button type="submit" on:click={handleAddProduct}>Add</button>
</div>

<style>
  .root {
    user-select: none;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-darken);
    padding: 0.3rem;
    border-radius: 15px;
  }
</style>
