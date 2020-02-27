<script>
  import { loadCsv } from './data/data';
  import Map from './Map.svelte';
  import Controls from './Controls.svelte';
  import DataTable from './DataTable.svelte';
  import { dayIdx } from './store';

  let data;
  let dayStrings;
  loadCsv().then(result => {
      data = result;

      const { dayHeader, sites } = result;
      dayStrings = dayHeader;
    });
</script>

<main>
	<Map sites={data && data.sites} />
	<Controls dayStrings={dayStrings} />

  <DataTable data={data} />

  <p>Educate public on virus spread</p>

	<p>Goals:</p>
  <ul>
    <li>Show virus progress over time</li>
    <li>Visualize infection rate</li>
    <li>Communicate both size and infection rate</li>
    <li>Try to reflect infected area as best as possible (no highlighting of entire countries)</li>
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
