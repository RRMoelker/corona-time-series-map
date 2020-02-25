<script>
  import Map from './Map.svelte';
  import Controls from './Controls.svelte';
</script>

<main>
	<Map />
	<Controls />

  <p>Educate public on virus spread</p>

	<p>Goals:</p>
  <ul>
    <li>Show virus progress over time</li>
    <li>Visualize infection rate</li>
    <li>Communicate both size, mortality while staying localized</li>
  </ul>

  <p>Design</p>
  <ul>
      <li>Highlight regions for multiple cases</li>
      <li>Color code infection rate (white to red)</li>
      <li>"Cured" regions in gray</li>
      <li>Number of cases using dot pattern</li>
      <li>Isolated cases as circle marker</li>
    </ul>
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
