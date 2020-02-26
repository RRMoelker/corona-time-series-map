<script>
  // import Button from '@smui/button';
  // import Slider from '@smui/slider';
  import { dayIdx } from './store';

  const timeStep = 1000; // ms
  const loop = true;
  let isRunning = false;
  let interval;

  export let dayStrings = [];
  let day = '';

  const updateDay = (newIndex) => {
    day = dayStrings[newIndex];
  };

  const onTimer = () => {
    ++$dayIdx;
    if ($dayIdx > dayStrings.length - 1) {
      if (loop) {
        $dayIdx = 0;
      } else {
        $dayIdx = dayStrings.length - 1;
        stopTimer()
      }
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      isRunning = true;
      interval = setInterval(onTimer, timeStep);
    }
  };
  const stopTimer = () => {
    if (isRunning) {
      isRunning = false;
      clearInterval(interval)
    }
  };
  const toggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const reset = () => {
    $dayIdx = 0;
  };

  startTimer();

  $: updateDay($dayIdx);
</script>


<div class="container">
  <input type=number bind:value={$dayIdx} min=0 max={dayStrings.length - 1}>
  <span>{day}</span>
  <input type=range bind:value={$dayIdx} min=0 max={dayStrings.length - 1}>
  <button on:click={toggleTimer}>{ isRunning ? 'pause' : 'play' }</button>
  <button on:click={reset}>restart</button>
</div>


<!--<Button>Just a Button</Button>-->
<!--<Slider bind:value={value3} min={-10} max={10} step={2} discrete displayMarkers />-->

<style>
 button {
  min-width: 8em;
 }
</style>
