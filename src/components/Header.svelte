<script>
import Button, {Group, GroupItem, Label} from '@smui/button';
import { Link } from "svelte-routing";

export let title = 'Corona virus map';
</script>
<header>
  <h1>{title}</h1>

  <nav class="top-nav">
    <Group variant="outlined">
      <Link to="/"><Button variant="outline"><Label>Map</Label></Button></Link>
      <Link to="dataset"><Button variant="outline"><Label>Dataset</Label></Button></Link>
      <Link to="about"><Button variant="outline"><Label>About</Label></Button></Link>
    </Group>
  </nav>

  <div class="clear"></div>
</header>

<style>
  header {
    padding: 0 1rem;
    margin-bottom: 1rem;
  }
  h1 {
    float: left;
    margin: 0;
  }
  .top-nav {
    float: right;
  }
  .clear {
    clear: both;
  }
</style>


