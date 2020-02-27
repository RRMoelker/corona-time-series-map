<script>
  import { dayHeader, sites } from '../store';
  import DataTable from '../components/DataTable.svelte';
</script>

<h1>Dataset</h1>

<p>
Data source from <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases</a> by JHU CSSE.

Overview of data from source enriched (averaged) derivated.
</p>

<DataTable dayHeader={$dayHeader} sites={$sites} />
