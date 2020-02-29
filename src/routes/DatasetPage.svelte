<script>
  import LinearProgress from '@smui/linear-progress';
  import DataTable from '../components/DataTable.svelte';
  import Header from '../components/Header.svelte';
  import { dayHeader, sites } from '../store';

  let showTable = false;

  setTimeout(() => showTable = true, 1000); // wait few ms before loading table (render = slow).
</script>

<Header title="Map dataset"></Header>

<main class="page-container">
  <p>
  Data source from <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases</a> by JHU CSSE.
  </p>

  <p>
  Overview of data from source enriched with (averaged) derivative.
  </p>

  {#if showTable }
    <DataTable dayHeader={$dayHeader} sites={$sites} />
  {:else}
    <LinearProgress indeterminate />
  {/if}
</main>
