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

  <div class="clear"></div>
</header>

<style>
  header {
    padding: .5rem 1rem 0;
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
    text-align: right;
  }
  nav.wide {
    display: none;
  }
  .clear {
    clear: both;
  }

  @media(min-width: 750px) {
      nav.wide {
        display: block;
      }
      nav.small {
        display: none;
      }
  }
  @media(max-width: 750px) {
      h1 {
        max-width: 70%;
        font-size: 1.5em;
      }
      header {
        margin-bottom: 0.5rem;
      }
  }
  @media(max-width: 350px) {
      h1 {
        max-width: 50%;
        font-size: 1.3em;
        word-break: break-word;
      }
  }
</style>


