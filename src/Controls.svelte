<script>
  import Button from '@smui/button';
  import Slider from '@smui/slider';
	let value3 = 2;
</script>

<Button>Just a Button</Button>

<Slider bind:value={value3} min={-10} max={10} step={2} discrete displayMarkers />

