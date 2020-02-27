<script>
  import DataTable from '../components/DataTable.svelte';
  import Header from '../components/Header.svelte';
  import { dayHeader, sites } from '../store';
</script>

<Header title="Dataset behind the map"></Header>

<main class="page-container">
  <p>
  Data source from <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases</a> by JHU CSSE.

  Overview of data from source enriched (averaged) derivated.
  </p>

  <DataTable dayHeader={$dayHeader} sites={$sites} />
</main>
