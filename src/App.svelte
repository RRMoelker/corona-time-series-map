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

<main>
  <Router url="{url}">
    <div>
      <Route path="dataset" component="{DatasetPage}" />
      <Route path="about" component="{AboutPage}" />
      <Route path="/"><HomePage /></Route>
    </div>
  </Router>
  <footer>
    <div>See about page for more info.</div>
  </footer>
</main>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
  }
  :global(.page-container) {
    padding: 0 1rem;
  }
  footer {
    background-color: lightgray;
  }
  footer div {
    text-align: right;
  }
</style>
