<script>
  import Header from '../components/Header.svelte';
  import { Link } from "svelte-routing";
</script>

<Header title="About this map"></Header>

<main class="page-container">
  <p>
    The goal of this app is to show Coronavirus spread over time.
    To allow people to make a more educated risk assessment.
  </p>

  <p>
    For a more detailed motivation as well as design considerations see <a href="https://dreamonward.com/2020/02/28/coronavirus-spread-animation/">this blog post</a>.
    Code is on <a href="https://github.com/RRMoelker/corona-time-series-map">Github</a>.
  </p>

  <p>
    To learn more about the data behind the map see the <Link to="dataset">dataset page</Link>.
    For license and legal please see the <a href="https://github.com/RRMoelker/corona-time-series-map/blob/master/LICENSE">license file</a>.
  </p>
</main>
