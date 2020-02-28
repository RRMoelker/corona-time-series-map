<script>
import Button, {Label} from '@smui/button';
import { Link } from "svelte-routing";

export let title = 'Corona virus map';
</script>
<header>
  <h1>{title}</h1>

  <nav>
    <Link to="/"><Button variant="outline"><Label>Map</Label></Button></Link>
    <Link to="dataset"><Button variant="outline"><Label>Dataset</Label></Button></Link>
    <Link to="about"><Button variant="outline"><Label>About</Label></Button></Link>
  </nav>

  <div class="clear"></div>
</header>

<style>
  header {
    padding: 0 1rem;
    margin-bottom: 1rem;

    border-bottom: 2px solid #6200ee;
  }
  h1 {
    display: inline-block;
    float: left;
    margin: 0;
  }
  nav {
    float: right;
  }

  .link {
    float: left;
  }
  .clear {
    clear: both;
  }
  @media(max-width: 750px) {
      h1 {
        max-width: 70%;
      }
      nav {
        display: flex;
        flex-direction: column;
        float: right;
      }
  }
  @media(max-width: 350px) {
      h1 {
        max-width: 50%;
      }
  }
</style>


