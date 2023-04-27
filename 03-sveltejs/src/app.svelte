<script lang="ts">
  import { useColor } from "@/stores";
  import { FancyFilter } from "@/components";
  import ProductList from "./product-list.svelte";
  const { color, onColorChange } = useColor();
  let visibility = "all";
</script>

<div class="root">
  <FancyFilter
    color={$color}
    on:color-change={(event) => onColorChange(event.detail.color)}
    {visibility}
    on:visibility-change={(event) => (visibility = event.detail.visibility)}
  />
  <ProductList {visibility} />
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--primary-main);
    border-radius: 10px;
  }
</style>
