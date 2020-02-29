<script>
  import { Router, Link, Route } from "svelte-routing";
  import HomePage from "./routes/HomePage.svelte";
  import AboutPage from "./routes/AboutPage.svelte";
  import DatasetPage from "./routes/DatasetPage.svelte";
  import { loadCsv } from './data/data';
  import { dayHeader, sites } from './store';

  export let url = "";

  loadCsv().then(data => {
    $dayHeader = data.dayHeader;
    $sites = data.sites;
  });
</script>

<Router url="{url}">
  <Route path="dataset" component="{DatasetPage}" />
  <Route path="about" component="{AboutPage}" />
  <Route path="/"><HomePage /></Route>
</Router>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  :global(.page-container) {
    padding: 0 1rem;
  }
</style>
