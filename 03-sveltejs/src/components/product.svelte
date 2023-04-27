<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Product } from "@/models";
  import RenderCount from "./render-count.svelte";
  import Icon from "./icon.svelte";
  export let product: Product;

  const dispatch = createEventDispatcher();
  const onChange = (id: string) => {
    dispatch("change", {
      id,
    });
  };
</script>

<li class="root">
  <input
    id={product.id}
    on:input={() => onChange(product.id)}
    type="checkbox"
    checked={product.fav}
  />
  <label for={product.id}>
    <Icon class={`star ${product.fav ? "fill" : ""}`} name="star" />
    <span>{product.name}</span>
    <span>{product.price}$</span>
  </label>
  <RenderCount />
</li>

<style>
  .root {
    user-select: none;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-dark);
    filter: brightness(0.9);
    padding: 1rem;
    border-radius: 15px;
  }

  .root input[type="checkbox"] {
    display: none;
  }

  .root label {
    cursor: pointer;
    min-width: 200px;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    text-transform: capitalize;
    color: white;
  }
  .root label > :last-child {
    margin-left: auto;
  }
</style>
