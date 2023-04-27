<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ColorPicker from "./color-picker.svelte";
  import Icon from "./icon.svelte";
  export let color: string;
  export let visibility: string;

  const dispatch = createEventDispatcher();
  const onColorChange = (event: CustomEvent<{ color: string }>) => {
    dispatch("color-change", {
      color: event.detail.color,
    });
  };
  const onVisibilityChange = (visibility: string) => {
    dispatch("visibility-change", {
      visibility,
    });
  };

  $: getStyles = (variant: string) =>
    visibility === variant ? "color: white;" : "color: black;";
</script>

<div class="root">
  <ColorPicker {color} on:change={onColorChange} />
  <button
    type="button"
    on:click={() => onVisibilityChange("all")}
    style={getStyles("all")}
  >
    All
  </button>
  <button type="button" on:click={() => onVisibilityChange("fav")}>
    <Icon class="star fill" name="star" style={getStyles("fav")} />
  </button>
  <button type="button" on:click={() => onVisibilityChange("unfav")}>
    <Icon class="star" name="star" style={getStyles("unfav")} />
  </button>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
  }
</style>
