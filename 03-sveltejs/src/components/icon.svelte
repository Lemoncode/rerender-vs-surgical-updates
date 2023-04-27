<script lang="ts">
  export let name: string;
</script>

<span
  style={$$props.style}
  class={`material-symbols-outlined ${$$props.class}`}
>
  {name}
</span>
