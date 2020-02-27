<script>
  import Map from '../components/Map.svelte';
  import Controls from '../components/Controls.svelte';
</script>

<main>
	<Map />
	<Controls />
</main>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
  }

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		min-height: 100%;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
