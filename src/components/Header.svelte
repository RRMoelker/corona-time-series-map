<script>
import Menu, {SelectionGroup, SelectionGroupIcon} from '@smui/menu';
import List, {Item, Separator, Text } from '@smui/list';
import Button, {Label} from '@smui/button';
import { Link } from "svelte-routing";

export let title = 'Coronavirus map';

let menu;

</script>
<header>
  <h1>{title}</h1>

  <nav class="small">
    <Button on:click={() => menu.setOpen(true)} variant="links">Goto</Button>
    <Menu bind:this={menu}>
          <List>
            <Item><Text><Link to="/">Home</Link></Text></Item>
            <Item><Text><Link to="dataset">Dataset</Link></Text></Item>
            <Item><Text><Link to="about">About</Link></Text></Item>
          </List>
        </Menu>
  </nav>

  <nav class="wide">
    <Link to="/"><Button variant="outline"><Label>Map</Label></Button></Link>
    <Link to="dataset"><Button variant="outline"><Label>Dataset</Label></Button></Link>
    <Link to="about"><Button variant="outline"><Label>About</Label></Button></Link>
  </nav>
</header>

<style>
  header {
    display: flex;
    align-items: center;

    padding: .5rem 1rem 0;
    margin-bottom: 1rem;

    border-bottom: 2px solid #6200ee;
  }
  h1 {
    flex: 1 1 auto;
    margin: 0;
    padding-bottom: 0.2em;
  }
  nav {
    flex: 0 0 auto;
    text-align: right;
    margin-bottom: -7px; /* offset margin-bottom in material button component (hard to edit) */
  }
  nav.wide {
    display: none;
  }
  @media(min-width: 600px) {
      nav.wide {
        display: block;
      }
      nav.small {
        display: none;
      }
  }
  @media(max-height: 700px) {
    header {
      margin-bottom: 0;
    }
  }
  @media(max-width: 750px) {
      header {
        padding: .5rem .5rem 0;
      }
      h1 {
        font-size: 1.5em;
      }
  }
  @media(max-width: 350px) {
      h1 {
        font-size: 1.3em;
        word-break: break-word;
      }
  }
</style>


