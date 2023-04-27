<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let color: string;
  const dispatch = createEventDispatcher();
  const onChange = (color: string) => {
    dispatch("change", {
      color,
    });
  };
</script>

<input
  class="root"
  type="color"
  value={color}
  on:input={(event) => onChange(event.currentTarget.value)}
/>

<style>
  .root {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }

  .root::-webkit-color-swatch {
    border: 1px solid black;
    padding: 0;
    border-radius: 50%;
  }
  .root::-webkit-color-swatch-wrapper {
    padding: 0;
  }
</style>
