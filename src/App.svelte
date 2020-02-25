<script>
  import Map from './Map.svelte';

	export let name;
</script>

<main>
	<p>Goals:</p>
  <ul>
    <li>Show virus progress over time</li>
    <li>Visualize infection rate</li>
    <li>Communicate both size, mortality while staying localized</li>
  </ul>

	<Map />
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
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
