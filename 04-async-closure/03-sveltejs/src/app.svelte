<script lang="ts">
  let message = "Inital message";
  let seconds = 0;

  setTimeout(() => {
    seconds = 1;
  }, 1000);

  setTimeout(() => {
    message = `Total seconds: ${seconds}`;
  }, 2000);
</script>

<h3>{message}</h3>
<h4>{seconds}</h4>
