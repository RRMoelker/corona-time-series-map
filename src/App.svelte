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
  <nav>
    <Link to="/">Home</Link>
    <Link to="dataset">Dataset</Link>
    <Link to="about">About</Link>
  </nav>
  <div>
    <Route path="dataset" component="{DatasetPage}" />
    <Route path="about" component="{AboutPage}" />
    <Route path="/"><HomePage /></Route>
  </div>
</Router>
