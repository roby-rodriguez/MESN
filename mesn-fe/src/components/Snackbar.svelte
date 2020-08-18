<script>
  import { Snackbar } from 'smelte';
  export let snackbar = {};
</script>

<Snackbar bind:value={snackbar.value} color={snackbar.color} right timeout={2000}>
  {snackbar.message}
</Snackbar>
